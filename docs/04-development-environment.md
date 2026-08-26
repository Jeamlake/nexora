# 04. Entorno de desarrollo

## Baseline validado

- Node.js: `v22.21.1`
- Expo: `~57.0.16`
- React Native: `0.86.2`
- React: `19.2.3`
- Expo Router: `~57.0.16`
- Firebase CLI: `15.28.1`
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
- Firebase CLI;
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

## Variables y secretos

Nunca versionar:

- contraseñas;
- claves privadas;
- service accounts;
- tokens administrativos;
- `.env` reales.

Consultar `.env.example`.
