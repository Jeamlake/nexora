# 02. Stack tecnológico

## Principio de selección

Las tecnologías se eligen por compatibilidad, mantenibilidad, seguridad, productividad y ajuste al dominio. Una tecnología no se adopta únicamente por ser nueva o prometer escalabilidad.

Este documento diferencia entre:

- **instalado:** existe actualmente en el monorepositorio;
- **aceptado:** existe una decisión arquitectónica, pero aún no se implementó;
- **pendiente:** necesita una decisión o validación posterior.

## Aplicación móvil

| Tecnología | Versión actual | Estado | Uso |
| --- | --- | --- | --- |
| React Native | `0.86.3` | Instalado | Aplicación Android/iOS |
| Expo | `~57.0.19` | Instalado | Framework y toolchain |
| React | `19.2.3` | Instalado | Componentes e interfaz |
| TypeScript | `~6.0.3` | Instalado | Lenguaje con modo estricto |
| Expo Router | `~57.0.18` | Instalado | Navegación basada en archivos |

Expo SDK 57 está asociado a React Native 0.86, React 19.2.3, React Native Web 0.21.0 y Node.js mínimo 22.13.x. Las dependencias Expo deben instalarse con `npx expo install` y validarse antes de fusionar cambios.

El 2026-09-02 se alinearon los parches recomendados para SDK 57. Expo Doctor completó 21/21 comprobaciones después de actualizar `package.json` y `package-lock.json`.

## Backend principal

La decisión aceptada es crear una API propia dentro de `apps/api`. El móvil y la API serán aplicaciones independientes dentro del mismo monorepositorio, según [ADR-006](adr/ADR-006-monorepo.md).

| Tecnología | Estado | Uso |
| --- | --- | --- |
| NestJS | Aceptado, no creado | API y módulos de negocio |
| TypeScript | Aceptado | Lenguaje del backend |
| PostgreSQL | Aceptado, no creado | Fuente de verdad relacional |
| Prisma | Aceptado, no creado | ORM y migraciones iniciales |
| REST | Aceptado | Interfaz principal del móvil |
| OpenAPI/Swagger | Aceptado | Contrato y documentación de la API |
| WebSockets | Aceptado | Eventos para clientes conectados |
| Docker | Aceptado | Infraestructura local reproducible |

Las versiones exactas del backend se decidirán al inicializar `apps/api`, se fijarán en el lockfile raíz y se documentarán junto al workspace. No se inventan versiones antes de comprobarlas.

## Servicios especializados

| Servicio | Estado | Uso |
| --- | --- | --- |
| Firebase Cloud Messaging | Aceptado, pendiente | Notificaciones push |
| Object Storage compatible con S3 | Proveedor pendiente | Fotografías de avisos e incidencias |
| Autenticación | Decisión pendiente | Identidad, sesiones y proveedores externos |

Firebase deja de ser el backend completo. Su decisión histórica se conserva en [ADR-003](adr/ADR-003-firebase.md) y fue reemplazada por [ADR-005](adr/ADR-005-nestjs-postgresql.md).

## Tiempo real y segundo plano

WebSockets y push resuelven situaciones diferentes:

- WebSocket distribuye eventos mientras la aplicación mantiene una conexión;
- FCM permite notificar cuando la aplicación está en segundo plano o cerrada.

Ninguna tecnología garantiza por sí sola el objetivo promedio de tres segundos. La latencia deberá medirse de extremo a extremo.

## Herramientas de desarrollo móvil

| Herramienta | Estado |
| --- | --- |
| Node.js 22 LTS | Estándar del equipo |
| npm y `package-lock.json` | Instalados y versionados |
| Git/GitHub | Activos |
| Android API 36 | Baseline Android |
| Expo Go | Útil para la fase inicial |
| Expo Development Build | Requerido cuando se incorporen integraciones nativas |
| EAS | Instalado en la estación inicial; configuración pendiente |

## Organización de paquetes

| Elemento | Estado | Uso |
| --- | --- | --- |
| npm workspaces | Instalado | Administrar las aplicaciones desde una raíz |
| `apps/mobile` | Instalado | Aplicación React Native y Expo |
| `apps/api` | Reservado | Futura aplicación NestJS |
| `packages` | Reservado | Contratos o utilidades con varios consumidores reales |

Existe un único `package-lock.json` en la raíz. Compartir repositorio no combina los artefactos de despliegue: móvil y API conservarán builds, variables, permisos y procesos independientes.

## Alternativas descartadas por ahora

### Firebase como backend completo

Reduce infraestructura, pero no es la opción adoptada para centralizar relaciones, transacciones, autorización y auditoría de Nexora.

### Supabase como backend completo

Es una alternativa válida basada en PostgreSQL y reduciría trabajo operativo. No fue elegida porque el proyecto busca mantener las reglas detrás de una API explícita y modular propia.

### Microservicios

No existe una necesidad medida que justifique su complejidad. El punto de partida será un monolito modular que puede desplegarse horizontalmente y evolucionar después.

## Resumen

```text
React Native + Expo + TypeScript
              |
              v
        NestJS + TypeScript
              |
              v
     PostgreSQL + Prisma

Complementos: WebSockets + FCM + Object Storage
```
