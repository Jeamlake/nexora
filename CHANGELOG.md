# Changelog

Todos los cambios relevantes del proyecto se documentarán aquí.

## Unreleased

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
