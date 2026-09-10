import { PrismaClient, ResidentStatus, UserRole } from '@prisma/client';
import 'dotenv/config';
import { hashPassword } from '../src/common/security/password-hasher.js';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL es obligatoria para ejecutar el seed.');
}

const prisma = new PrismaClient({
  datasources: { db: { url: databaseUrl } },
});

const DEMO_PASSWORD = 'Nexora2026!';

async function main(): Promise<void> {
  const passwordHash = await hashPassword(DEMO_PASSWORD);
  const condominium = await prisma.condominium.upsert({
    where: { name: 'Condominio Los Jardines' },
    update: {},
    create: { name: 'Condominio Los Jardines' },
  });
  const unit = await prisma.unit.upsert({
    where: {
      condominiumId_code: {
        condominiumId: condominium.id,
        code: 'A-301',
      },
    },
    update: { isActive: true },
    create: {
      condominiumId: condominium.id,
      code: 'A-301',
      tower: 'Torre A',
      block: 'Manzana 1',
      floor: '3',
    },
  });

  const residentUser = await prisma.user.upsert({
    where: { email: 'residente@nexora.local' },
    update: {
      displayName: 'María Residente',
      passwordHash,
      role: UserRole.RESIDENT,
      isActive: true,
    },
    create: {
      displayName: 'María Residente',
      email: 'residente@nexora.local',
      phone: '+51 900 000 101',
      passwordHash,
      role: UserRole.RESIDENT,
    },
  });
  const resident = await prisma.resident.upsert({
    where: { userId: residentUser.id },
    update: { unitId: unit.id, status: ResidentStatus.ACTIVE },
    create: {
      userId: residentUser.id,
      unitId: unit.id,
      status: ResidentStatus.ACTIVE,
    },
  });
  await prisma.emergencyContact.deleteMany({
    where: { residentId: resident.id },
  });
  await prisma.emergencyContact.createMany({
    data: [
      {
        residentId: resident.id,
        name: 'Carlos Ramírez',
        phone: '+51 900 000 201',
        relationship: 'Hermano',
      },
      {
        residentId: resident.id,
        name: 'Ana Torres',
        phone: '+51 900 000 202',
        relationship: 'Madre',
      },
    ],
  });

  await Promise.all([
    prisma.user.upsert({
      where: { email: 'administrador@nexora.local' },
      update: { passwordHash, role: UserRole.ADMIN_DIRECTIVE, isActive: true },
      create: {
        displayName: 'Administración Nexora',
        email: 'administrador@nexora.local',
        passwordHash,
        role: UserRole.ADMIN_DIRECTIVE,
      },
    }),
    prisma.user.upsert({
      where: { email: 'seguridad@nexora.local' },
      update: { passwordHash, role: UserRole.SECURITY_GUARD, isActive: true },
      create: {
        displayName: 'Seguridad Nexora',
        email: 'seguridad@nexora.local',
        passwordHash,
        role: UserRole.SECURITY_GUARD,
      },
    }),
  ]);

  console.log('Datos de demostración cargados.');
  console.log('Residente: residente@nexora.local / Nexora2026!');
  console.log('Administración: administrador@nexora.local / Nexora2026!');
  console.log('Seguridad: seguridad@nexora.local / Nexora2026!');
}

await main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
