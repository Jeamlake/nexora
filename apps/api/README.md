# Nexora API

Servidor de Nexora para reglas de negocio, permisos y persistencia. La elección de NestJS y PostgreSQL está en [ADR-005](../../docs/adr/ADR-005-nestjs-postgresql.md); sus razones y límites se explican en [fundamentos](../../docs/14-decision-rationale.md).

## Estado

La base HTTP utiliza NestJS 12, TypeScript estricto, ESM y Express. Ya incluye configuración validada, prefijo versionado, validación global, errores uniformes, health check, OpenAPI y pruebas.

| Método y ruta | Propósito |
| --- | --- |
| `GET /api/v1/health` | Confirmar que el proceso HTTP responde |
| `GET /docs` | Interfaz Swagger del contrato actual |
| `GET /docs/openapi.json` | Documento OpenAPI para consumidores y pruebas |

El health check no comprueba todavía PostgreSQL ni servicios externos. Faltan persistencia, autenticación, autorización y módulos funcionales. El estado exacto está en [06-current-status.md](../../docs/06-current-status.md).

## Configuración

Copiar el archivo de ejemplo antes de añadir variables locales:

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

```shell
cp apps/api/.env.example apps/api/.env
```

Variables actuales:

| Variable | Valores | Predeterminado |
| --- | --- | --- |
| `NODE_ENV` | `development`, `test` o `production` | `development` |
| `PORT` | Entero entre 1 y 65535 | `3000` |

Joi valida y convierte estos valores antes de iniciar el servidor. Los archivos `.env` reales no se versionan.

## Instalar y ejecutar desde la raíz

```shell
npm ci
npm run api:start:dev
```

Con `PORT=3000`, abrir:

- [health check](http://localhost:3000/api/v1/health);
- [Swagger](http://localhost:3000/docs);
- [OpenAPI JSON](http://localhost:3000/docs/openapi.json).

La API aún no requiere PostgreSQL. Para ejecutar la salida compilada:

```shell
npm run build --workspace @nexora/api
npm run start:prod --workspace @nexora/api
```

## Comprobaciones

La comprobación completa del monorepositorio se ejecuta desde la raíz:

```shell
npm run check
```

Para revisar solo la API:

```shell
npm run check --workspace @nexora/api
```

Ese comando ejecuta Oxlint, comprobación de formato con Prettier, TypeScript, pruebas unitarias, pruebas HTTP y compilación. `npm run format --workspace @nexora/api` sí modifica archivos.

Las pruebas cubren:

- valores predeterminados y rechazo de puertos inválidos;
- respuesta del servicio de salud;
- ruta versionada de salud;
- publicación del contrato OpenAPI;
- formato uniforme de un error 404.

## Estructura implementada

```text
apps/api/
├── src/
│   ├── common/filters/
│   ├── config/
│   ├── modules/health/dto/
│   ├── app.application.ts
│   ├── app.constants.ts
│   ├── app.module.ts
│   └── main.ts
├── test/app.e2e-spec.ts
├── .env.example
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── vitest.config.e2e.ts
```

Los módulos `auth`, `residents`, `visitors` y los demás dominios siguen siendo diseño objetivo en [arquitectura](../../docs/03-architecture.md). Crear carpetas vacías no los implementa.

## Decisiones y límites

Express se conserva como adaptador HTTP predeterminado. El lockfile fuerza `multer` 2.3.0 porque NestJS 12.0.1 declara 2.2.0 y esa versión acumula avisos altos de denegación de servicio. La API no implementa cargas de archivos todavía.

Se retiraron `@nestjs/mau`, el script `deploy` y `vite-tsconfig-paths`: no había proveedor de despliegue aprobado y Vite ya ofrece la resolución de `tsconfig` usada por las pruebas.

Antes de incorporar Prisma se debe elegir su versión y comprobar ESM, generación del cliente y migraciones. Continuar desde [el plan del primer avance](../../docs/11-first-advance-plan.md) y [las decisiones pendientes](../../docs/15-pending-decisions.md).
