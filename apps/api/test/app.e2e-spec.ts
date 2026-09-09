import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { configureApplication } from './../src/app.application.js';
import { AppModule } from './../src/app.module.js';

describe('Nexora API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApplication(app);
    await app.init();
  });

  it('expone el estado de salud bajo el prefijo versionado', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'nexora-api',
    });
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false);
  });

  it('publica el contrato OpenAPI', async () => {
    const response = await request(app.getHttpServer())
      .get('/docs/openapi.json')
      .expect(200);

    expect(response.body.info.title).toBe('Nexora API');
    expect(response.body.paths).toHaveProperty('/api/v1/health');
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

  afterEach(async () => {
    await app.close();
  });
});
