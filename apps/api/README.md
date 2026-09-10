# Nexora API

API NestJS de Nexora para autenticación, permisos, reglas y persistencia en PostgreSQL. Las decisiones principales están en [ADR-005](../../docs/adr/ADR-005-nestjs-postgresql.md) y [ADR-007](../../docs/adr/ADR-007-autenticacion-y-sesiones.md).

## Rutas del entregable 1

| Método y ruta | Acceso | Propósito |
| --- | --- | --- |
| `GET /api/v1/health` | Público | Comprueba API y PostgreSQL |
| `POST /api/v1/auth/login` | Público | Inicia sesión |
| `POST /api/v1/auth/refresh` | Refresh token | Rota la sesión |
| `POST /api/v1/auth/logout` | Bearer | Revoca la sesión identificada por el access token |
| `GET /api/v1/profile/me` | Residente | Devuelve perfil, unidad y contactos |
| `GET /api/v1/residents` | Administración/directiva | Demuestra autorización por rol |
| `GET /docs` | Público | Swagger |
| `GET /docs/openapi.json` | Público | Contrato OpenAPI |

## Configuración

Desde la raíz:

```bash
cp apps/api/.env.example apps/api/.env
```

| Variable | Uso | Ejemplo local |
| --- | --- | --- |
| `DATABASE_URL` | Conexión exclusiva de la API/Prisma | `postgresql://nexora:nexora_local@localhost:5432/nexora` |
| `JWT_ACCESS_SECRET` | Firma de access tokens; mínimo 32 caracteres | Cambiar por ambiente |
| `JWT_ACCESS_TTL_SECONDS` | Vigencia del access token | `900` |
| `REFRESH_TOKEN_TTL_DAYS` | Vigencia máxima de la sesión | `30` |
| `PORT` | Puerto HTTP | `3000` |

Los `.env` reales no se versionan. `EXPO_PUBLIC_*` tampoco debe contener secretos.

## Base y ejecución

```bash
npm ci
npm run db:up
npm run db:migrate
npm run db:seed
npm run api:start:dev
```

Prisma está fijado en 6.12.0 porque la auditoría de las versiones 6.13–7.10 disponibles detectó dependencias vulnerables del CLI. La migración inicial crea condominios, unidades, usuarios, residentes, contactos y sesiones. Un trigger de PostgreSQL aplica el máximo de tres contactos incluso si una escritura evita la API.

## Comprobaciones

Con la base migrada y sembrada:

```bash
npm run check --workspace @nexora/api
```

Vitest y Supertest prueban salud, OpenAPI, autenticación, perfil, roles, rotación/revocación y la restricción de contactos. La guía completa está en [demostración del entregable 1](../../docs/16-demostracion-entregable-1.md).

## Estructura

```text
apps/api/
├── prisma/                 esquema, migración y seed
├── src/common/             guardas, roles, errores y contraseñas
├── src/database/           PrismaService
├── src/modules/auth/       login, refresh y logout
├── src/modules/health/     estado de API y PostgreSQL
├── src/modules/profile/    perfil y listado restringido
└── test/                   pruebas HTTP contra PostgreSQL
```
