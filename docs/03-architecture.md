# 03. Arquitectura

## Estado

La estructura por capas y el Domain Core inicial existen en `apps/mobile`. El backend descrito en este documento es la arquitectura aceptada; `apps/api` está reservado, pero NestJS todavía no ha sido inicializado.

No debe confundirse arquitectura diseñada con funcionalidad implementada.

## Contexto del sistema

```text
Usuarios
   |
   v
Nexora Mobile
React Native + Expo
   |
   | HTTPS / WebSocket
   v
Nexora API
NestJS modular monolith
   |
   +-- PostgreSQL / Prisma
   +-- Firebase Cloud Messaging
   +-- Object Storage
```

La aplicación móvil nunca se conecta directamente a PostgreSQL. Los secretos y credenciales del servidor pertenecen exclusivamente a `apps/api` y a su plataforma de despliegue.

## Arquitectura del repositorio

```text
nexora/
├── apps/
│   ├── mobile/
│   └── api/
├── packages/
├── docs/
├── package.json
└── package-lock.json
```

El repositorio es único, pero cada aplicación conserva dependencias, configuración, variables y artefactos de despliegue propios. La raíz orquesta workspaces, documentación y validaciones transversales.

## Arquitectura interna del móvil

El requisito académico solicita presentación, lógica de negocio y acceso a datos. Nexora utiliza:

- **Presentation:** interfaz y estado visual;
- **Domain:** entidades, reglas, contratos y casos de uso;
- **Data:** adaptadores HTTP/WebSocket y mapeo de datos;
- **Infrastructure:** servicios concretos utilizados detrás de Data.

### Flujo de ejecución

```text
Usuario
  |
  v
Presentation
  |
  v
Domain / Use Cases
  |
  v
Repository Interface (Domain)
  ^
  |
Data Repository Implementation
  |
  v
NestJS API
```

### Regla de dependencias

```text
Presentation -> Domain
Data         -> Domain
Data         -> API adapters
Domain       -X-> Expo, React Native, NestJS, Prisma, Firebase
```

Domain define los contratos. Data los implementa y traduce DTO externos a modelos de dominio.

## Estructura móvil

```text
apps/mobile/src/
├── app/
├── presentation/
│   ├── components/
│   ├── hooks/
│   └── screens/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── use-cases/
├── data/
│   ├── api/
│   ├── datasources/
│   ├── mappers/
│   └── repositories/
├── shared/
│   ├── constants/
│   ├── types/
│   └── utils/
└── config/
```

`apps/mobile/src/app` es la frontera de rutas de Expo Router. El código de pantalla reutilizable debe migrar progresivamente a Presentation conforme se implementen funcionalidades.

## Arquitectura del backend

El backend comenzará como un monolito modular, una sola unidad de despliegue con límites internos explícitos.

```text
apps/api/src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── condominiums/
│   ├── units/
│   ├── residents/
│   ├── visitors/
│   ├── notices/
│   ├── polls/
│   ├── alerts/
│   └── incidents/
├── common/
├── config/
└── main.ts
```

Esta estructura es orientativa. `apps/api` documentará su estructura real cuando sea inicializado.

## Autoridad de las reglas

La API y PostgreSQL deben proteger reglas críticas como:

- autorización por rol y pertenencia a condominio;
- unicidad del voto según la regla que se apruebe;
- expiración y uso único del pase QR;
- máximo de contactos de emergencia;
- transiciones válidas de alertas e incidencias;
- historial de cambios importantes.

El móvil puede repetir validaciones para responder rápidamente al usuario, pero una llamada directa a la API no debe poder evadir las reglas.

## Comunicación y tiempo real

### REST

REST será el canal principal para comandos y consultas. El contrato tendrá prefijo versionado, inicialmente `/api/v1`, y se publicará mediante OpenAPI.

### WebSockets

Se utilizarán para distribuir eventos a aplicaciones conectadas, por ejemplo una alerta creada o atendida. No sustituyen a la persistencia ni a la autorización.

### Notificaciones push

FCM avisará a dispositivos en segundo plano o cerrados. El evento se crea y persiste primero en la API; la notificación es un mecanismo de entrega, no la fuente de verdad.

## Datos y archivos

- PostgreSQL conserva datos estructurados, relaciones, estados y auditoría.
- Prisma administra el acceso tipado y las migraciones iniciales.
- Object Storage conserva fotografías y otros binarios.
- PostgreSQL conserva la referencia, metadatos y permisos del archivo.

## Escalabilidad

La estrategia inicial consiste en:

1. consultas e índices correctos;
2. conexiones a PostgreSQL administradas;
3. API sin estado local persistente;
4. múltiples instancias solo cuando las métricas lo requieran;
5. observabilidad y pruebas de carga antes de agregar infraestructura.

Redis, colas y microservicios no forman parte del baseline. Se introducirán únicamente si resuelven un problema observado.

## Decisiones relacionadas

- [ADR-003: Firebase, reemplazado](adr/ADR-003-firebase.md)
- [ADR-004: Arquitectura por capas](adr/ADR-004-layered-architecture.md)
- [ADR-005: NestJS y PostgreSQL](adr/ADR-005-nestjs-postgresql.md)
- [ADR-006: Monorepositorio](adr/ADR-006-monorepo.md)
- [Plan de transición](10-backend-transition.md)
