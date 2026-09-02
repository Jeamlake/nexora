# 04. Entorno de desarrollo

## Baseline validado

- Node.js: `v22.21.1`
- Expo: `~57.0.19`
- React Native: `0.86.3`
- React: `19.2.3`
- Expo Router: `~57.0.18`
- Firebase CLI: `15.28.1` en la estación inicial; no es un requisito actual del móvil
- EAS CLI: `eas-cli/22.5.0 win32-x64 node-v22.21.1`
- Android: API 36
- Android Emulator: Google APIs x86_64

## Herramientas utilizadas

- Visual Studio Code;
- Git;
- GitHub Desktop;
- NVM for Windows;
- Node.js;
- npm;
- Android Studio;
- Android SDK;
- ADB;
- Expo;
- EAS CLI.

## Organización local de la estación inicial

```text
E:\Desarrollo
├── Proyectos
└── Cache
    ├── npm
    └── gradle
```

AVD:

```text
E:\AndroidAVD
```

Estas rutas son específicas de la estación inicial y no son obligatorias para otros desarrolladores.

## Emulador validado

`Condominio_API_36`

- Android 16;
- API 36;
- Google APIs;
- x86_64;
- Windows Hypervisor Platform.

## Flujo verificado

```text
Proyecto
  ->
Metro Bundler
  ->
Expo Go
  ->
Android Emulator
  ->
Aplicación visible
```

## Expo Go

Expo Go se usa en la fase inicial.

Cuando se necesiten módulos o configuraciones nativas no disponibles en Expo Go se migrará a un **Expo Development Build**.

## Compatibilidad del equipo

El repositorio puede instalarse en Windows, macOS y Linux. Android puede desarrollarse localmente en los tres sistemas; iOS local requiere macOS. Las rutas de esta página son evidencia del equipo inicial, no requisitos para otros colaboradores.

La guía reproducible y neutral respecto al sistema operativo se encuentra en [05-installation-and-setup.md](05-installation-and-setup.md).

## Backend futuro

NestJS, PostgreSQL, Prisma y Docker pertenecen al futuro repositorio `nexora-api`. No son requisitos para ejecutar el baseline móvil actual.

## Variables y secretos

Nunca versionar:

- contraseñas;
- claves privadas;
- service accounts;
- tokens administrativos;
- `.env` reales.

Consultar `.env.example`.

`EXPO_PUBLIC_API_URL` será visible dentro del bundle móvil. Solo identifica el endpoint; las credenciales del backend nunca deben almacenarse en variables `EXPO_PUBLIC_*`.
