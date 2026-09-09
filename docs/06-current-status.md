# 06. Estado actual

Corte: **2026-09-08**. Evidencia: archivos del repositorio, instalación limpia y comandos ejecutados desde la raíz.

## Implementado

| Área | Estado comprobado |
| --- | --- |
| Organización | Monorepositorio con `apps/mobile`, `apps/api`, npm workspaces y un lockfile raíz |
| Móvil | Expo SDK 57, rutas de plantilla, capas iniciales y regla de máximo tres contactos |
| API | NestJS 12, ESM, TypeScript estricto, configuración validada y adaptador Express |
| Contrato HTTP | Prefijo `/api/v1`, health check, Swagger, OpenAPI JSON y errores uniformes |
| Calidad | Checks agregados, pruebas de ambos workspaces y workflow de GitHub Actions |
| Documentación | Índice y guías en español con decisiones, cuatro avances y pendientes separados |

La API expone:

| Ruta | Resultado actual |
| --- | --- |
| `GET /api/v1/health` | Estado del proceso, nombre del servicio y marca de tiempo |
| `GET /docs` | Interfaz Swagger |
| `GET /docs/openapi.json` | Contrato OpenAPI |

El health check comprueba el proceso HTTP. Incorporará dependencias cuando exista PostgreSQL u otro servicio obligatorio.

## Pendiente del primer avance

El móvil conserva la interfaz de plantilla y todavía no consume la API. Faltan PostgreSQL, Prisma, Docker Compose, migraciones, seed, decisión e implementación de autenticación, roles, residentes/unidades, cliente HTTP y pantallas de login y perfil.

Por tanto, **el primer entregable sigue incompleto**. El resultado esperado continúa siendo iniciar sesión en el móvil, obtener desde PostgreSQL el perfil residente-unidad y cerrar sesión.

Avisos, encuestas, visitantes, alertas e incidencias corresponden a entregables posteriores. FCM, almacenamiento de fotografías, biometría y perfiles EAS tampoco están implementados.

## Validación del 2026-09-08

Entorno observado: Node.js `22.22.3` y npm `10.9.8`.

| Comprobación | Resultado |
| --- | --- |
| `npm ci` | Instalación reproducible desde el lockfile |
| `npm run lint` | Correcto para API y móvil |
| `npm run format:check` | Correcto para API |
| `npm run typecheck` | Correcto para API y móvil |
| `npm run test` | Correcto: 3 pruebas unitarias de API y 3 de `Resident` |
| `npm run test:e2e` | Correcto: 3 pruebas HTTP de API |
| `npm run build` | Compilación de API correcta |
| Expo Doctor | **21/21** comprobaciones |
| `npm run check` | Correcto; reúne todas las comprobaciones anteriores salvo `npm ci` |
| `git diff --check` | Correcto |
| API compilada | Responde `200` en health, Swagger y OpenAPI JSON |
| Expo Web | Compila 1.297 módulos y responde `200` en `localhost:8081` |

Los parches alineados mediante `npx expo install --fix` son `@expo/ui ~57.0.17`, `expo ~57.0.21`, `expo-glass-effect ~57.0.2` y `expo-router ~57.0.20`.

La comprobación también cubrió una copia de trabajo de Windows con `core.autocrlf=true`. Prettier conserva el final de línea de cada sistema para que `npm run format:check` produzca el mismo resultado que CI. El código fuente no cambió por esta corrección.

## Auditoría de dependencias

`npm audit` informa **14 avisos moderados, 0 altos y 0 críticos**. Los moderados pertenecen a cadenas de herramientas de Expo y Expo Router; las correcciones automáticas propuestas degradan paquetes principales a versiones incompatibles con SDK 57, por lo que no se aplicaron.

NestJS 12.0.1 declara `multer` 2.2.0 mediante `@nestjs/platform-express`. Esa versión sí tenía avisos altos corregidos en 2.3.0. La raíz fija 2.3.0 con `overrides`; las pruebas HTTP y la instalación limpia confirman la resolución. La API aún no acepta cargas de archivos.

La auditoría se registra como evidencia, pero no sustituye el análisis del alcance de cada aviso. No se utilizó `npm audit fix --force`.

## Alcance y límites de la comprobación

El workflow `.github/workflows/ci.yml` ejecuta `npm ci` y `npm run check` en pushes y Pull Requests de `main`. ADB está instalado en la estación revisada, pero no había un dispositivo o emulador conectado. La validación local no incluye dispositivo físico, emulador, instalación de PostgreSQL, carga, disponibilidad ni flujo móvil-servidor porque esas piezas aún no existen.

## Próximo paso

Continuar con PostgreSQL, Prisma, Docker Compose y la primera migración. Después corresponde cerrar el ADR de autenticación y construir el primer flujo vertical. Seguir [primer avance](11-first-advance-plan.md) y [registro de pendientes](15-pending-decisions.md); no volver a generar NestJS sobre los archivos existentes.
