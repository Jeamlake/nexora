# 05. Instalación y preparación en otra computadora

## Objetivo

Esta guía permite que un colaborador con acceso a GitHub prepare el monorepositorio de Nexora desde cero en Windows, macOS o Linux. No depende de las rutas utilizadas por la computadora original.

Al 2026-09-08, el monorepositorio contiene una base NestJS operativa en `apps/api`. PostgreSQL y Prisma siguen pendientes; no se debe regenerar NestJS sobre los archivos existentes. Ver [estado actual](06-current-status.md).

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

El repositorio oficial es `Jeamlake/nexora` y actualmente es público. Para enviar ramas o Pull Requests, cada colaborador debe iniciar sesión en GitHub y conservar el acceso de escritura asignado por la administración del repositorio.

### 2. Git

Instalar Git desde [git-scm.com](https://git-scm.com/downloads) y verificar:

```shell
git --version
```

GitHub Desktop es opcional. Todos los pasos también pueden realizarse desde una terminal.

### 3. Node.js

Usar Node.js `>=22.22.3 <23`, según `engines` del paquete raíz. La estación revisada usa Node.js `22.22.3` y npm `10.9.8`; el gestor declarado es `npm@10.9.8`. El mínimo de Expo SDK 57 es 22.13.x, pero el requisito del repositorio es más estricto.

El archivo `.nvmrc` fija `22.22.3` para administradores de versiones que necesitan un valor exacto. El rango de `engines` permanece como comprobación de compatibilidad para npm y otras herramientas.

Puede utilizarse el instalador oficial de [nodejs.org](https://nodejs.org/) o un administrador de versiones compatible con el sistema operativo.

Verificar:

```shell
node --version
npm --version
```

Con NVM for Windows 2.x también puede activarse explícitamente la versión:

```shell
nvm use 22.22.3
```

Si `node --version` funciona, pero `npm --version` muestra el código `NVM4306` y dice que el comando delegado no es confiable, reparar los permisos y la caché de verificación antes de reconstruir los accesos administrados por NVM:

```shell
nvm doctor --autofix
nvm reshim
nvm use 22.22.3
node --version
npm --version
```

Después de la reparación, cerrar la terminal integrada con la papelera y abrir una terminal Git Bash nueva si conserva el error. Este es un falso positivo conocido del modo `shim`: ocurre antes de ejecutar los scripts de Nexora. Primero debe responder npm y después se puede usar `npm ci`. Ver el [diagnóstico de NVM for Windows](https://github.com/nvm-windows/nvm/issues/1379).

No es necesario instalar Expo CLI globalmente. El proyecto usa la versión incluida en sus dependencias mediante `npx expo`.

## Clonar el proyecto

### Opción SSH

Usar esta opción si el colaborador ya registró su clave SSH en GitHub:

```shell
git clone git@github.com:Jeamlake/nexora.git
cd nexora
```

### Opción HTTPS

```shell
git clone https://github.com/Jeamlake/nexora.git
cd nexora
```

Comprobar el repositorio:

```shell
git remote -v
git status
```

La rama `main` representa el estado estable. Una tarea nueva debe desarrollarse en su propia rama, según [CONTRIBUTING.md](../CONTRIBUTING.md).

## Restaurar exactamente las dependencias

Desde la raíz del repositorio, restaurar todos los workspaces:

```shell
npm ci
```

`npm ci` utiliza `package-lock.json` y evita que cada computadora resuelva versiones distintas. No se debe copiar `node_modules` desde otra computadora ni reemplazar `npm ci` por actualizaciones manuales.

Si se necesita cambiar una dependencia de Expo, entrar primero a `apps/mobile`, utilizar `npx expo install` en una rama dedicada y versionar juntos el `package.json` del móvil y el `package-lock.json` raíz.

## Configuración local

Copiar los archivos de ejemplo de cada aplicación a archivos locales.

Windows PowerShell:

```powershell
Copy-Item apps/mobile/.env.example apps/mobile/.env.local
Copy-Item apps/api/.env.example apps/api/.env
```

macOS o Linux:

```shell
cp apps/mobile/.env.example apps/mobile/.env.local
cp apps/api/.env.example apps/api/.env
```

El archivo móvil contiene `EXPO_PUBLIC_API_URL`; el móvil todavía no la consume mediante un cliente HTTP funcional. La API usa `NODE_ENV` y `PORT`, carga sus archivos desde `apps/api` y rechaza valores inválidos al iniciar.

La API ya implementa el prefijo `/api/v1`. Utilizar según el cliente los siguientes valores:

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

Este script ejecuta lint de ambos workspaces, comprobación de formato de API, typecheck, pruebas unitarias, tres pruebas HTTP, compilación de API y Expo Doctor. Al 2026-09-08 todo el conjunto pasa y Expo Doctor completa 21/21; ver [resultados exactos](06-current-status.md).

## Ejecutar la base API local

Desde la raíz, en una terminal independiente:

```shell
npm run api:start:dev
```

Escucha en `PORT` o `3000`. Expone `GET /api/v1/health`, Swagger en `/docs` y OpenAPI JSON en `/docs/openapi.json`; no requiere PostgreSQL todavía. Los comandos y límites están en [la guía de API](../apps/api/README.md).

## Ejecutar con un dispositivo físico

1. Instalar una versión de Expo Go compatible con SDK 57.
2. Conectar computadora y dispositivo a una red que permita comunicación entre ambos.
3. Desde la raíz, ejecutar:

```shell
npm start
```

4. Escanear el QR mostrado por Expo.

Si la red local bloquea la conexión, puede probarse temporalmente:

```shell
cd apps/mobile
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

Los comandos de EAS y Expo que no tengan un script raíz deben ejecutarse desde `apps/mobile`. No ejecutar `npx expo prebuild` ni versionar manualmente `apps/mobile/android` o `apps/mobile/ios` sin una decisión del proyecto. Nexora utiliza Continuous Native Generation y esas carpetas se mantienen ignoradas.

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
- `package.json` y `package-lock.json` de la raíz;
- `apps/mobile/package.json` y `apps/mobile/app.json`;
- archivos `.env.example` de cada aplicación;
- configuración compartida;
- documentación;
- historial Git.

## Diagnóstico mínimo

Si algo falla, guardar en un reporte:

- sistema operativo y versión;
- `node --version`;
- `npm --version`;
- resultado de `npm run doctor` desde la raíz;
- resultado de `npm run typecheck` desde la raíz;
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
