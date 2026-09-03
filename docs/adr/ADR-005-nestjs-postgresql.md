# ADR-005: NestJS y PostgreSQL como backend principal

- **Estado:** Aceptado
- **Fecha:** 2026-09-02
- **Reemplaza:** [ADR-003: Firebase como backend administrado](ADR-003-firebase.md)
- **Modificado por:** [ADR-006: Monorepositorio](ADR-006-monorepo.md) para la ubicación del backend

## Contexto

Nexora necesita gestionar relaciones y reglas que deben cumplirse incluso si un cliente intenta llamar directamente al backend:

- residentes asociados a unidades y condominios;
- roles y permisos;
- máximo de contactos de emergencia;
- control de votos duplicados;
- pases QR temporales y de un solo uso;
- trazabilidad de visitantes, alertas e incidencias;
- distribución de eventos en tiempo real y notificaciones push.

El Domain Core del móvil ya está desacoplado de la persistencia. Firebase aún no fue integrado, por lo que este es el punto de menor costo para revisar la decisión.

## Alternativas consideradas

1. Firebase como backend completo.
2. Supabase como Backend as a Service basado en PostgreSQL.
3. API propia con NestJS y PostgreSQL.
4. Arquitectura inicial de microservicios.

## Decisión

Crear la aplicación `apps/api` dentro del monorepositorio de Nexora y desplegarla inicialmente como un **monolito modular** con:

- NestJS y TypeScript;
- PostgreSQL como fuente de verdad;
- Prisma como ORM y sistema de migraciones inicial;
- API REST versionada y documentada con OpenAPI/Swagger;
- WebSockets para eventos mientras el cliente está conectado;
- Firebase Cloud Messaging para notificaciones push;
- almacenamiento de objetos compatible con S3, o equivalente, para fotografías;
- Docker para reproducir la infraestructura local;
- CI para validaciones automáticas.

La aplicación móvil consumirá la API desde su capa Data. Domain no dependerá de NestJS, Prisma, PostgreSQL, Firebase ni del proveedor de almacenamiento.

## Forma inicial de despliegue

El backend será una sola unidad desplegable con módulos de negocio claramente delimitados. No se crearán microservicios, colas distribuidas, Kubernetes ni Redis sin una necesidad medida.

```text
Nexora Mobile
      |
      | HTTPS / WebSocket
      v
NestJS modular monolith
      |
      +-- PostgreSQL
      +-- Firebase Cloud Messaging
      +-- Object Storage
```

## Módulos previstos

- Auth;
- Users;
- Condominiums;
- Units;
- Residents;
- Visitors;
- Notices;
- Polls;
- Alerts;
- Incidents.

La lista orienta el diseño; no autoriza a generar todos los módulos antes de necesitarse.

## Límites de esta decisión

Esta decisión no resuelve todavía:

- proveedor o implementación final de autenticación;
- proveedor de hosting;
- proveedor de almacenamiento de objetos;
- contrato detallado de cada endpoint;
- garantías medibles de disponibilidad y latencia.

La autenticación requiere un ADR separado por su impacto de seguridad. El objetivo de aproximadamente tres segundos para alertas se validará mediante pruebas; no se considerará garantizado únicamente por usar WebSockets o FCM.

## Consecuencias positivas

- reglas de negocio centralizadas y verificables en el servidor;
- integridad relacional y transacciones en PostgreSQL;
- auditoría e historial más naturales;
- contratos HTTP explícitos para el móvil y futuros clientes;
- módulos que pueden separarse en el futuro si existe evidencia para hacerlo;
- TypeScript compartido como lenguaje entre móvil y backend.

## Consecuencias negativas

- mayor trabajo inicial que un Backend as a Service;
- responsabilidad sobre despliegue, seguridad, observabilidad y copias de respaldo;
- necesidad de operar una base de datos;
- configuración de workspaces y CI diferenciada para móvil y backend.

## Reglas de implementación

1. La API es la autoridad de permisos y reglas de negocio.
2. PostgreSQL también aplicará restricciones que protejan la integridad de los datos.
3. El móvil puede repetir validaciones para mejorar la experiencia, pero no reemplaza al servidor.
4. Las fotografías se guardan en almacenamiento de objetos; PostgreSQL conserva metadatos y referencias.
5. Los secretos del backend nunca usan variables `EXPO_PUBLIC_*` ni se incluyen en el repositorio móvil.
6. Los cambios del contrato se versionan y se reflejan en OpenAPI.
7. Las nuevas piezas de infraestructura requieren necesidad, evidencia y documentación.

## Criterios para revisar la decisión

Revisar este ADR solamente si aparece evidencia de que:

- el equipo no puede operar de forma sostenible el backend;
- el plazo académico hace inviable la implementación mínima;
- las pruebas muestran un cuello de botella que la arquitectura no puede resolver;
- requisitos externos obligan a utilizar otra plataforma.

El crecimiento por sí solo no obliga a migrar a microservicios.
