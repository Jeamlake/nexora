# 05. Instalación y preparación de otra computadora

Esta guía explica cómo preparar otra computadora Windows sin depender de rutas locales específicas.

## Opción A — Desarrollo inicial con celular Android físico

### 1. Cuenta y acceso a GitHub

Crear/iniciar sesión en GitHub y solicitar acceso al repositorio privado.

https://github.com/

### 2. Instalar Git

https://git-scm.com/download/win

### 3. Instalar GitHub Desktop

https://desktop.github.com/

### 4. Instalar Visual Studio Code

https://code.visualstudio.com/

### 5. Instalar NVM for Windows

https://github.com/coreybutler/nvm-windows/releases

Instalar y utilizar **Node.js 22 LTS**.

### 6. Clonar el repositorio

En GitHub Desktop:

1. elegir clonar repositorio;
2. seleccionar `nexora-mobile`;
3. escoger una carpeta local con espacio suficiente;
4. finalizar.

### 7. Abrir el proyecto

Abrir el repositorio en Visual Studio Code.

### 8. Restaurar dependencias

El proyecto contiene `package.json` y `package-lock.json`.

Restaurar las dependencias desde esos archivos.

No copiar `node_modules` desde otra computadora.

### 9. Instalar Expo Go

https://expo.dev/go

Usar una versión compatible con el SDK del proyecto.

### 10. Red local

La computadora y el teléfono deben poder comunicarse por la misma red local.

### 11. Iniciar Expo

Iniciar el servidor de desarrollo desde el proyecto.

### 12. Abrir la app

Cargar el proyecto desde Expo Go.

---

## Opción B — Entorno completo con Android Emulator

Además de los pasos anteriores:

### 1. Instalar JDK 17 LTS

https://adoptium.net/temurin/releases/?version=17

Seleccionar Windows, x64 y JDK.

### 2. Instalar Android Studio

https://developer.android.com/studio

### 3. Instalar componentes Android

Desde SDK Manager verificar:

- Android SDK Platform 36;
- Android SDK Build-Tools 36.0.0;
- Android SDK Platform-Tools;
- Android Emulator;
- Android SDK Command-Line Tools.

### 4. Crear un dispositivo virtual

Desde Device Manager:

1. crear un Virtual Device;
2. seleccionar un Pixel estándar;
3. usar Android API 36;
4. elegir Google APIs x86_64;
5. finalizar.

### 5. Virtualización

Habilitar virtualización del procesador y un hipervisor compatible con Android Emulator.

### 6. Variables locales

Configurar correctamente:

- `JAVA_HOME`;
- `ANDROID_HOME`;
- Platform Tools en PATH.

Las rutas dependen de cada computadora.

### 7. Iniciar el emulador

Esperar que Android termine de arrancar.

### 8. Ejecutar el proyecto

Iniciar Expo para Android. Expo debe detectar el dispositivo y abrir la app.

---

## Firebase CLI

https://firebase.google.com/docs/cli

Actualmente la CLI está instalada en la estación inicial, pero Firebase todavía no está integrado.

## EAS

https://docs.expo.dev/eas/

Se utilizará posteriormente para Development Builds y builds de distribución.

## No copiar entre computadoras

No compartir manualmente:

- `node_modules`;
- Android SDK;
- AVD;
- caché npm;
- caché Gradle;
- `.env`;
- credenciales.

## Sí debe venir desde GitHub

- código fuente;
- `package.json`;
- `package-lock.json`;
- configuración Expo;
- assets;
- documentación;
- `.env.example`;
- historial Git.

## Verificación final

Antes de desarrollar comprobar:

- proyecto clonado;
- Node 22 activo;
- dependencias restauradas;
- dispositivo Android disponible;
- aplicación cargando;
- repositorio Git funcional.

Baseline de referencia: 2026-08-26.
