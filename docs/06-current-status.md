# 06. Estado actual

Fecha de corte: 2026-09-03.

## Resumen

Nexora completó el baseline móvil, el Domain Core inicial y la decisión de adoptar un backend propio. El repositorio se reorganizó como monorepo: el móvil vive en `apps/mobile` y `apps/api` reserva la frontera del backend. Todavía no existen funcionalidades de negocio conectadas a datos reales ni una API NestJS inicializada.

## Repositorio

- remoto: `git@github.com:Jeamlake/nexora.git`;
- nombre oficial en GitHub: `Jeamlake/nexora`;
- visibilidad verificada: pública;
- rama estable: `main`;
- PR #4 fusionado en `main` el 2026-09-02;
- commit de integración: `8ad47fea8db69a006fe3d5a57b765d9ced86a1c2`;
- `main` y `origin/main` verificados en el mismo commit al iniciar el primer avance;
- la rama histórica `feature/domain-core` se conserva como referencia, pero ya no contiene trabajo pendiente de integración;
- la transición a monorepo se desarrolla en `chore/monorepo-transition` antes de integrarse a `main`.

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
- `apps/mobile/src/data/api` reservado para el futuro adaptador;
- npm workspaces configurado en la raíz;
- aplicación Expo trasladada a `apps/mobile`;
- frontera `apps/api` reservada;
- decisión de monorepositorio registrada en ADR-006.

## Validación vigente

- Node.js: `22.21.1` en la estación inicial;
- npm: `10.9.4`;
- TypeScript: sin errores;
- Git: árbol de trabajo limpio antes de iniciar esta transición;
- Expo Doctor del 2026-09-03: 21/21 comprobaciones desde la raíz del monorepositorio;
- configuración pública de Expo resuelta correctamente desde `apps/mobile`;
- exportación web estática correcta desde `apps/mobile`, con cuatro rutas;
- dependencias reproducibles mediante `package-lock.json`;
- npm Audit: 14 vulnerabilidades moderadas transitivas, 0 High y 0 Critical; no se aplicó una corrección forzada.

## No implementado todavía

- aplicación NestJS dentro de `apps/api`;
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
- licencia del código original de Nexora; el `LICENSE` actual fue heredado de la plantilla de Expo.

## Siguiente hito

Ejecutar el [plan del primer avance](11-first-advance-plan.md). Después de integrar la reorganización, el siguiente paso técnico es inicializar un baseline reproducible de NestJS en `apps/api` antes de configurar PostgreSQL y Prisma.
