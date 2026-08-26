# 02. Stack tecnológico

## Principio de selección

Las tecnologías se eligen por compatibilidad, estabilidad, productividad, capacidad multiplataforma, acceso a hardware móvil y mantenibilidad; no únicamente por ser las más nuevas.

El baseline fue establecido el 2026-08-26.

## React Native

**Versión:** `0.86.3`

### Uso

Desarrollo móvil Android/iOS compartiendo gran parte del código.

### Razones

- multiplataforma;
- ecosistema amplio;
- integración con TypeScript;
- acceso a capacidades nativas;
- compatibilidad con Expo.

### Alternativas consideradas

**Kotlin Android:** excelente integración nativa, pero una aplicación Kotlin Android tradicional no reutiliza la misma UI en iOS.

**Flutter:** multiplataforma y maduro, pero incorpora Dart y reduce la reutilización de TypeScript dentro del stack.

### Decisión

React Native ofrece un buen equilibrio entre productividad, capacidad móvil y reutilización tecnológica.

## Expo

**Versión:** `~57.0.17`

### Uso

Framework y toolchain sobre React Native.

Aporta inicialización, navegación, compatibilidad de paquetes, APIs móviles, Development Builds y EAS.

### Razón de versión

El proyecto fue creado con Expo SDK 57 y validado con las versiones compatibles instaladas por su template:

- Expo `~57.0.17`
- React Native `0.86.3`
- React `19.2.3`
- Expo Router `~57.0.17`

No se actualizará una versión mayor solo por existir una más nueva. Toda actualización debe pasar validaciones de Expo, librerías nativas, Firebase y Android/iOS.

## React

**Versión:** `19.2.3`

Proporciona el modelo de componentes usado por React Native. Se mantiene alineado con Expo y React Native.

## TypeScript

**Versión:** `~6.0.3`

### Razones

El dominio tendrá usuarios, residentes, unidades, visitantes, pases, alertas, encuestas e incidencias.

TypeScript aporta:

- tipos estáticos;
- autocompletado;
- refactorización más segura;
- detección temprana de errores.

El proyecto utiliza `strict: true`.

### Alternativa

JavaScript permitiría desarrollar la misma aplicación, pero con menos garantías estáticas en una base de código creciente.

## Expo Router

**Versión:** `~57.0.17`

### Uso

Navegación basada en archivos dentro de `src/app`.

### Razones

- organización natural de rutas;
- layouts;
- deep linking;
- menor configuración manual;
- integración directa con Expo.

## Node.js

**Entorno validado:** `v22.21.1`

### Estándar del equipo

**Node.js 22 LTS**

No se exige el mismo patch exacto si la versión sigue siendo compatible y pasa las validaciones del proyecto.

## npm

Administra dependencias, scripts y `package-lock.json`.

`package-lock.json` debe permanecer versionado.

No debe ejecutarse `npm audit fix --force` sin revisar los cambios propuestos.

## Android

### Baseline

- Android 16;
- API 36;
- Build Tools 36.0.0;
- Google APIs x86_64.

La API elegida está alineada con el baseline de Expo SDK 57.

## JDK

### Estación inicial

Temurin JDK 21 estaba instalado y fue suficiente para el flujo inicial con Expo Go.

### Estándar recomendado del equipo

**Temurin JDK 17 LTS** para trabajo nativo/Gradle hasta validar formalmente otra versión.

## Firebase

### Estado

Seleccionado, pero todavía **no integrado**.

Firebase CLI: `15.28.1`

### Servicios previstos

- Authentication;
- Realtime Database;
- Cloud Storage;
- Cloud Messaging;
- Cloud Functions.

### Razones

El caso requiere autenticación, eventos en tiempo real, archivos, notificaciones y lógica del servidor.

### Alternativas

**Supabase:** excelente si el modelo requiere PostgreSQL y relaciones SQL complejas.

**Backend propio Node/NestJS:** control completo, pero mayor infraestructura, seguridad y mantenimiento.

### Decisión

Firebase reduce la infraestructura necesaria y encaja bien con el alcance actual.

## EAS

EAS CLI: `eas-cli/22.5.0 win32-x64 node-v22.21.1`

Se utilizará posteriormente para:

- Development Builds;
- builds Android;
- AAB;
- distribución interna;
- potenciales builds iOS.

Todavía no se ha configurado EAS dentro del proyecto.

## Git y GitHub

Git controla versiones. GitHub aloja el repositorio remoto y facilita colaboración, Pull Requests e historial.

`main` debe representar un estado estable.

## Visual Studio Code

Editor principal recomendado.

Extensiones útiles:

- ESLint;
- Prettier;
- React Native Tools;
- GitLens.

## Resumen

Stack adoptado:

**React Native + Expo + TypeScript + Expo Router + Firebase + Git/GitHub**
