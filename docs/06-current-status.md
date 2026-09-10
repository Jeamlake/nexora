# 06. Estado actual

Corte: **2026-09-10**. Este documento distingue el código implementado de la validación pendiente del Pull Request.

## Entregable 1 implementado

| Área | Evidencia |
| --- | --- |
| Organización | Monorepositorio con workspaces, un lockfile y scripts raíz |
| Datos | PostgreSQL 18.6 en Compose, volumen, Prisma 6.12, migración y seed repetible |
| Integridad | Relaciones y trigger que impide más de tres contactos por residente |
| API | NestJS 12, configuración validada, `/api/v1`, errores uniformes y OpenAPI |
| Sesiones | Scrypt, JWT de 15 minutos, refresh opaco de 30 días, rotación y revocación |
| Autorización | Roles administración/directiva, residente y seguridad comprobados en servidor |
| Perfil | Consulta desde PostgreSQL con usuario, condominio, unidad y contactos |
| Móvil | Login, sesión persistente, renovación, perfil, reintento y cierre |
| Arquitectura móvil | Presentation → casos de uso/contrato Domain ← repositorio Data/HTTP |
| Calidad | Pruebas unitarias, HTTP con base real, builds, Expo Doctor y CI con PostgreSQL |
| Documentación | ADR de autenticación, instalación, cuentas seed y guion de demostración |

## Contrato disponible

| Ruta | Acceso |
| --- | --- |
| `GET /api/v1/health` | Público; comprueba PostgreSQL |
| `POST /api/v1/auth/login` | Público |
| `POST /api/v1/auth/refresh` | Refresh token vigente |
| `POST /api/v1/auth/logout` | Sesión autenticada; revoca la sesión actual |
| `GET /api/v1/profile/me` | Residente |
| `GET /api/v1/residents` | Administración/directiva |
| `GET /docs` y `/docs/openapi.json` | Documentación pública |

## Validación

El código móvil pasa TypeScript y 7 pruebas. La API pasa lint, TypeScript, 5 pruebas unitarias y build. Las pruebas HTTP agregadas cubren salud con PostgreSQL, autenticación, perfil, roles, rotación, revocación y máximo de contactos.

La validación completa se ejecuta con:

```shell
npm run db:up
npm run db:migrate
npm run db:seed
npm run check
```

GitHub Actions prepara un servicio PostgreSQL limpio y repite migración, seed y `npm run check`. El resultado definitivo del PR se registra en sus checks.

## Dependencias

Las versiones de Expo se mantienen alineadas con SDK 57 y SecureStore usa `~57.0.3`. Prisma CLI y Client están fijados en `6.12.0`: se evita la cadena vulnerable encontrada en las versiones posteriores evaluadas. `npm audit` informa 14 avisos moderados transitivos de Expo, 0 altos y 0 críticos.

La auditoría npm puede incluir avisos transitivos de herramientas Expo. No se aplica `npm audit fix --force` porque propone cambios incompatibles; cada aviso se revisa por alcance.

## Lo que sigue fuera del entregable 1

- entregable 2: avisos, encuestas y visitantes/QR;
- entregable 3: alertas, ubicación, notificaciones e incidencias con fotos;
- entregable 4: recuperación, Google, biometría, endurecimiento, carga y distribución final.

La rúbrica, fechas y formato oficial del curso siguen pendientes de contrastar. Consultar [cuatro avances](12-academic-advances.md) y [pendientes](15-pending-decisions.md).
