# Changelog

Todos los cambios relevantes del proyecto se documentarán aquí.

## Unreleased

### Changed — Transición al backend propio

- Firebase deja de ser el backend principal y ADR-003 queda marcado como reemplazado.
- Se acepta un monolito modular con NestJS, PostgreSQL y Prisma mediante ADR-005.
- REST/OpenAPI, WebSockets, FCM y Object Storage quedan ubicados en la arquitectura objetivo.
- Se reemplaza el área vacía `src/data/firebase` por `src/data/api`.
- `.env.example` define `EXPO_PUBLIC_API_URL` como configuración pública del futuro cliente HTTP.
- Se documentan los entregables y el orden de creación de `nexora-api`.

### Changed — Compatibilidad Expo SDK 57

- Expo se alinea a `~57.0.19`.
- Expo Router se alinea a `~57.0.18`.
- Se actualizan los parches recomendados de `@expo/ui`, `expo-constants`, `expo-font`, `expo-image` y `expo-linking`.
- Se registra el config plugin de `expo-image` generado por Expo Install.
- Se declaran los requisitos de Node/npm y los scripts `typecheck`, `doctor` y `check`.
- Expo Doctor vuelve a completar 21/21 comprobaciones.
- npm Audit mantiene 14 vulnerabilidades moderadas transitivas y ninguna High/Critical; no se ejecuta `npm audit fix --force`.

### Documentation — Colaboración multiplataforma

- Se actualiza la instalación reproducible para Windows, macOS y Linux.
- Se documentan Git SSH/HTTPS, `npm ci`, validaciones, emuladores, dispositivos físicos y configuración de la futura API.
- Se distingue el estado real del móvil de las piezas aún no creadas del backend.

### Added — Domain core

- Se crean las entidades `User`, `Resident`, `Unit` y `EmergencyContact`.
- Se definen los roles de usuario del caso.
- Se modela la asociación entre residente y unidad.
- Se incorpora la regla de máximo tres contactos de emergencia.
- Se documenta el modelo inicial en `docs/09-domain-model.md`.

### Added — Arquitectura base

- Se crea la estructura física inicial de las capas Presentation, Domain y Data.
- Se crean áreas compartidas para configuración, constantes, tipos y utilidades.
- Se documenta la responsabilidad de cada directorio dentro de `src/README.md`.
- La estructura implementa el baseline descrito en `docs/03-architecture.md`.

### Changed — Identidad de producto Nexora

- Se adopta **Nexora** como nombre oficial del producto.
- Descriptor: **Plataforma móvil de gestión y convivencia residencial**.
- Slogan: **Tu comunidad, conectada.**
- Se documenta la historia, propuesta de valor, misión, visión y pilares.
- El nombre técnico del paquete cambia a `nexora-mobile`.
- El nombre visible de Expo cambia a `Nexora`.
- El slug y scheme de Expo cambian a `nexora`.
- Se formaliza la especificación de requisitos del caso y sus decisiones pendientes.
- Se corrige la documentación arquitectónica para distinguir flujo de ejecución y dirección de dependencias.

## Baseline inicial — 2026-08-26

### Added

- proyecto React Native;
- Expo SDK 57;
- TypeScript;
- Expo Router;
- estructura `src/app`;
- Android API 36;
- Android Emulator;
- Git y GitHub;
- Firebase CLI;
- EAS CLI;
- documentación técnica inicial.

### Validated

- Expo Doctor 21/21;
- dependencias compatibles;
- Android 16 / API 36;
- Metro Bundler;
- Expo Go;
- primera ejecución Android correcta.

### Known

- Firebase todavía no integrado;
- funcionalidades de negocio todavía no implementadas;
- existen vulnerabilidades moderadas en dependencias transitivas;
- no existen vulnerabilidades High/Critical bloqueantes en el baseline analizado.
