# 05. Instalación y preparación en otra computadora

## Objetivo

Esta guía permite que un colaborador con acceso a GitHub prepare `nexora-mobile` desde cero en Windows, macOS o Linux. No depende de las rutas utilizadas por la computadora original.

El repositorio del backend `nexora-api` todavía no existe. Cuando sea creado tendrá su propia guía para NestJS, PostgreSQL y Docker.

## Compatibilidad por plataforma

| Tarea | Windows | macOS | Linux |
| --- | :---: | :---: | :---: |
| Editar TypeScript y ejecutar Metro | Sí | Sí | Sí |
| Probar en dispositivo físico con Expo Go | Sí | Sí | Sí |
| Android Emulator y compilación Android local | Sí | Sí | Sí |
| iOS Simulator y compilación iOS local | No | Sí | No |
| Compilaciones remotas con EAS | Sí | Sí | Sí |

El desarrollo inicial puede realizarse con Expo Go. Cuando Nexora incorpore módulos o configuración nativa no incluidos allí, el equipo compartirá un Expo Development Build.

## Requisitos comunes

### 1. Acceso al repositorio

El colaborador debe aceptar la invitación al repositorio privado `Jeamlake/nexora-mobile` e iniciar sesión en GitHub.

### 2. Git

Instalar Git desde [git-scm.com](https://git-scm.com/downloads) y verificar:

```shell
git --version
```

GitHub Desktop es opcional. Todos los pasos también pueden realizarse desde una terminal.

### 3. Node.js

Instalar Node.js 22 LTS. Expo SDK 57 requiere como mínimo Node.js 22.13.x; el baseline comprobado del equipo es Node.js 22.21.1.

Puede utilizarse el instalador oficial de [nodejs.org](https://nodejs.org/) o un administrador de versiones compatible con el sistema operativo.

Verificar:

```shell
node --version
npm --version
```

No es necesario instalar Expo CLI globalmente. El proyecto usa la versión incluida en sus dependencias mediante `npx expo`.

## Clonar el proyecto

### Opción SSH

Usar esta opción si el colaborador ya registró su clave SSH en GitHub:

```shell
git clone git@github.com:Jeamlake/nexora-mobile.git
cd nexora-mobile
```

### Opción HTTPS

```shell
git clone https://github.com/Jeamlake/nexora-mobile.git
cd nexora-mobile
```

Comprobar el repositorio:

```shell
git remote -v
git status
```

La rama `main` representa el estado estable. Una tarea nueva debe desarrollarse en su propia rama, según [CONTRIBUTING.md](../CONTRIBUTING.md).

## Restaurar exactamente las dependencias

Desde la raíz del repositorio:

```shell
npm ci
```

`npm ci` utiliza `package-lock.json` y evita que cada computadora resuelva versiones distintas. No se debe copiar `node_modules` desde otra computadora ni reemplazar `npm ci` por actualizaciones manuales.

Si se necesita cambiar una dependencia de Expo, utilizar `npx expo install` en una rama dedicada y versionar juntos `package.json` y `package-lock.json`.

## Configuración local

Copiar `.env.example` a `.env.local`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS o Linux:

```shell
cp .env.example .env.local
```

El archivo contiene `EXPO_PUBLIC_API_URL`. La API todavía no existe, por lo que la variable no será utilizada funcionalmente en esta fase.

Cuando `nexora-api` se ejecute localmente, utilizar según el cliente:

| Cliente | Valor de ejemplo |
| --- | --- |
| Web o iOS Simulator | `http://localhost:3000/api/v1` |
| Android Emulator estándar | `http://10.0.2.2:3000/api/v1` |
| Dispositivo físico | `http://IP_LAN_DE_LA_COMPUTADORA:3000/api/v1` |
| Backend remoto | URL HTTPS del entorno |

Las variables `EXPO_PUBLIC_*` se incorporan al bundle del cliente y nunca deben contener secretos.

## Validar la instalación

Ejecutar la validación completa:

```shell
npm run check
```

Este script ejecuta TypeScript y Expo Doctor. Ambos deben terminar correctamente. Si Expo Doctor propone cambiar versiones, el colaborador no debe corregirlas unilateralmente: debe abrir una tarea o Pull Request de mantenimiento para que el equipo revise el lockfile completo.

## Ejecutar con un dispositivo físico

1. Instalar una versión de Expo Go compatible con SDK 57.
2. Conectar computadora y dispositivo a una red que permita comunicación entre ambos.
3. Ejecutar:

```shell
npm start
```

4. Escanear el QR mostrado por Expo.

Si la red local bloquea la conexión, puede probarse temporalmente:

```shell
npx expo start --tunnel
```

El túnel resuelve la conexión con Metro, pero no vuelve accesible automáticamente una API local configurada con `localhost`.

## Ejecutar en Android Emulator

Disponible en Windows, macOS y Linux.

### Herramientas

- [Android Studio](https://developer.android.com/studio);
- Android SDK Platform 36;
- Android SDK Build-Tools 36.0.0;
- Android SDK Platform-Tools;
- Android Emulator;
- Android SDK Command-Line Tools;
- JDK 17 LTS recomendado para el baseline nativo hasta validación posterior.

Crear un dispositivo virtual Android API 36, iniciarlo y comprobar:

```shell
adb devices
```

Después ejecutar:

```shell
npm run android
```

El nombre `Condominio_API_36` y la ruta `E:\AndroidAVD` pertenecen a la estación original; los colaboradores pueden usar cualquier nombre y ruta local.

## Ejecutar en iOS Simulator

La compilación iOS local requiere macOS y Xcode compatible con Expo SDK 57.

Con el simulador iniciado:

```shell
npm run ios
```

Windows y Linux pueden trabajar en el código compartido, probar Android y posteriormente utilizar EAS para compilar iOS de forma remota cuando el proyecto lo configure.

## Ejecutar en navegador

```shell
npm run web
```

La ejecución web sirve para ciclos rápidos, pero no reemplaza las pruebas de cámara, ubicación, biometría, notificaciones ni comportamiento Android/iOS.

## Desarrollo con módulos nativos

Expo Go es suficiente para el baseline actual. Cuando se integren notificaciones, biometría u otra configuración nativa, se añadirá `expo-dev-client` y se distribuirá un Development Build compatible al equipo.

No ejecutar `npx expo prebuild` ni versionar manualmente `android/` o `ios/` sin una decisión del proyecto. Nexora utiliza Continuous Native Generation y esas carpetas se mantienen ignoradas.

## Flujo diario de colaboración

Antes de comenzar una tarea:

```shell
git switch main
git pull --ff-only origin main
git switch -c tipo/nombre-corto
npm ci
```

Ejemplos de ramas:

- `feature/resident-profile`;
- `docs/api-transition`;
- `fix/unit-validation`;
- `chore/expo-patches`.

Antes de abrir un Pull Request:

```shell
npm run check
git diff --check
git status
```

No hacer push directo a `main`. El Pull Request debe explicar qué cambió, qué requisito afecta y cómo se validó.

## Archivos que no se comparten

- `node_modules`;
- `.env` y `.env.local`;
- Android SDK y Xcode;
- dispositivos virtuales;
- cachés de npm, Gradle o Metro;
- certificados, claves, tokens y credenciales.

## Archivos que sí deben venir desde GitHub

- código fuente y assets;
- `package.json` y `package-lock.json`;
- `app.json`;
- `.env.example`;
- configuración compartida;
- documentación;
- historial Git.

## Diagnóstico mínimo

Si algo falla, guardar en un reporte:

- sistema operativo y versión;
- `node --version`;
- `npm --version`;
- resultado de `npx expo-doctor`;
- resultado de `npm exec tsc -- --noEmit`;
- salida completa del comando que falló;
- dispositivo o emulador utilizado;
- `git status --short --branch`.

No incluir `.env`, tokens, claves ni datos personales en el reporte.

## Referencias oficiales

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Preparar el entorno de Expo](https://docs.expo.dev/get-started/set-up-your-environment/)
- [Variables de entorno en Expo](https://docs.expo.dev/guides/environment-variables/)
- [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [GitHub: conexión por SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
