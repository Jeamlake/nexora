# 06. Estado actual

Fecha de corte: 2026-09-02.

## Resumen

Nexora se encuentra al final de la fase de Domain Core y en transición formal hacia un backend propio. No existe todavía una aplicación funcional ni el repositorio `nexora-api`.

## Repositorio

- remoto: `git@github.com:Jeamlake/nexora-mobile.git`;
- rama estable: `main`;
- rama de trabajo: `feature/domain-core`;
- la rama reúne el Domain Core y la transición arquitectónica por encima de `main`;
- la integración a `main` debe realizarse mediante Pull Request.

## Completado

### Producto y requisitos

- identidad Nexora;
- problema, propuesta de valor y pilares;
- requisitos funcionales y no funcionales;
- ambigüedades del caso registradas;
- documentación versionada.

### Aplicación móvil

- React Native y Expo SDK 57;
- TypeScript estricto;
- Expo Router;
- estructura Presentation, Domain y Data;
- entidades `User`, `Resident`, `Unit` y `EmergencyContact`;
- regla de máximo tres contactos de emergencia;
- baseline Android probado con Expo Go.

### Transición arquitectónica

- Firebase marcado como backend principal reemplazado;
- NestJS y PostgreSQL aceptados en ADR-005;
- monolito modular seleccionado;
- REST, OpenAPI, WebSockets, FCM y Object Storage ubicados en la arquitectura;
- contrato de configuración `EXPO_PUBLIC_API_URL` documentado;
- `src/data/api` reservado para el futuro adaptador.

## Validación vigente

- Node.js: `22.21.1` en la estación inicial;
- npm: `10.9.4`;
- TypeScript: sin errores;
- Git: árbol de trabajo limpio antes de iniciar esta transición;
- Expo Doctor del 2026-09-02: 21/21 comprobaciones después de alinear los parches de SDK 57;
- dependencias reproducibles mediante `package-lock.json`;
- npm Audit: 14 vulnerabilidades moderadas transitivas, 0 High y 0 Critical; no se aplicó una corrección forzada.

## No implementado todavía

- `nexora-api`;
- NestJS, PostgreSQL, Prisma y Docker;
- cliente HTTP/WebSocket del móvil;
- autenticación;
- repositorios y casos de uso funcionales;
- pantallas de negocio;
- avisos, encuestas y votos;
- visitantes y QR;
- alertas, ubicación y tiempo real;
- FCM;
- almacenamiento de fotografías;
- incidencias;
- Development Build y EAS configurados;
- pruebas automatizadas y CI.

## Decisiones pendientes

- estrategia y proveedor de autenticación;
- regla de voto por unidad o residente;
- comportamiento de encuestas obligatorias;
- umbral de toques del botón de pánico;
- medición de disponibilidad y latencia;
- criterios verificables de accesibilidad;
- proveedores de hosting y Object Storage.

## Siguiente hito

Completar la revisión y el merge de `feature/domain-core` mediante Pull Request. Después se creará `nexora-api` con su propio baseline reproducible.
