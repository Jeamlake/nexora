import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { configureApplication } from './../src/app.application.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/database/prisma.service.js';

interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

describe('Nexora API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApplication(app);
    await app.init();
  });

  it('comprueba API y PostgreSQL bajo el prefijo versionado', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      database: 'up',
      service: 'nexora-api',
    });
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false);
  });

  it('publica en OpenAPI salud, autenticación y perfil', async () => {
    const response = await request(app.getHttpServer())
      .get('/docs/openapi.json')
      .expect(200);

    expect(response.body.info.title).toBe('Nexora API');
    expect(response.body.paths).toHaveProperty('/api/v1/health');
    expect(response.body.paths).toHaveProperty('/api/v1/auth/login');
    expect(response.body.paths).toHaveProperty('/api/v1/profile/me');
  });

  it('normaliza las respuestas de error', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/missing')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      path: '/api/v1/missing',
    });
    expect(response.body.message).toBeTypeOf('string');
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false);
  });

  it('rechaza credenciales inválidas y rutas sin sesión', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'residente@nexora.local', password: 'incorrecta' })
      .expect(401);
    await request(app.getHttpServer()).get('/api/v1/profile/me').expect(401);
  });

  it('autentica al residente y devuelve el perfil persistido', async () => {
    const session = await login('residente@nexora.local');
    const response = await request(app.getHttpServer())
      .get('/api/v1/profile/me')
      .set('Authorization', `Bearer ${session.accessToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      user: { email: 'residente@nexora.local', role: 'RESIDENT' },
      status: 'ACTIVE',
      condominium: { name: 'Condominio Los Jardines' },
      unit: { code: 'A-301' },
    });
    expect(response.body.emergencyContacts).toHaveLength(2);
    expect(Number.isNaN(Date.parse(response.body.user.lastLoginAt))).toBe(
      false,
    );
  });

  it('aplica autorización según el rol', async () => {
    const resident = await login('residente@nexora.local');
    await request(app.getHttpServer())
      .get('/api/v1/residents')
      .set('Authorization', `Bearer ${resident.accessToken}`)
      .expect(403);

    const administrator = await login('administrador@nexora.local');
    const response = await request(app.getHttpServer())
      .get('/api/v1/residents')
      .set('Authorization', `Bearer ${administrator.accessToken}`)
      .expect(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: expect.objectContaining({ role: 'RESIDENT' }),
        }),
      ]),
    );

    const security = await login('seguridad@nexora.local');
    await request(app.getHttpServer())
      .get('/api/v1/residents')
      .set('Authorization', `Bearer ${security.accessToken}`)
      .expect(403);
  });

  it('rota el refresh token y revoca la sesión al cerrar', async () => {
    const first = await login('residente@nexora.local');
    const refreshResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken: first.refreshToken })
      .expect(200);
    const next = refreshResponse.body as SessionResponse;

    expect(next.refreshToken).not.toBe(first.refreshToken);
    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken: first.refreshToken })
      .expect(401);

    await request(app.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${next.accessToken}`)
      .expect(200);
    await request(app.getHttpServer())
      .get('/api/v1/profile/me')
      .set('Authorization', `Bearer ${next.accessToken}`)
      .expect(401);
  });

  it('impide superar tres contactos aunque dos escrituras compitan', async () => {
    const prisma = app.get(PrismaService);
    const resident = await prisma.resident.findFirstOrThrow({
      where: { user: { email: 'residente@nexora.local' } },
    });

    try {
      const writes = await Promise.allSettled([
        prisma.emergencyContact.create({
          data: {
            residentId: resident.id,
            name: 'Contacto concurrente 3',
            phone: '+51 900 000 203',
            relationship: 'Prueba',
          },
        }),
        prisma.emergencyContact.create({
          data: {
            residentId: resident.id,
            name: 'Contacto concurrente 4',
            phone: '+51 900 000 204',
            relationship: 'Prueba',
          },
        }),
      ]);

      expect(
        writes.filter(({ status }) => status === 'fulfilled'),
      ).toHaveLength(1);
      expect(writes.filter(({ status }) => status === 'rejected')).toHaveLength(
        1,
      );
      await expect(
        prisma.emergencyContact.count({
          where: { residentId: resident.id },
        }),
      ).resolves.toBe(3);
    } finally {
      await prisma.emergencyContact.deleteMany({
        where: {
          residentId: resident.id,
          name: { startsWith: 'Contacto concurrente' },
        },
      });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  async function login(email: string): Promise<SessionResponse> {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email, password: 'Nexora2026!' })
      .expect(200);
    return response.body as SessionResponse;
  }
});
