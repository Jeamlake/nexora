# 04. Entorno de desarrollo

## Referencia actual

Al 2026-09-08 se observaron Node.js `22.22.3` y npm `10.9.8`. La raíz exige `>=22.22.3 <23` y npm `>=10`. El [inventario](02-tech-stack.md) mantiene las versiones de aplicaciones; [estado actual](06-current-status.md) mantiene los resultados de comprobación.

Node.js ejecuta herramientas JavaScript y el servidor NestJS. npm instala dependencias y ejecuta scripts. Metro prepara el código del cliente para desarrollo; no sustituye a la API. TypeScript es el lenguaje/comprobador, no una base de datos.

## Herramientas y responsabilidad

| Herramienta | Para qué se usa | Condición |
| --- | --- | --- |
| Node.js y npm | Ejecutar herramientas, workspaces y API | Requeridos |
| Git | Historial y colaboración | Requerido para el flujo del equipo |
| VS Code / otro editor | Edición y depuración | Elección del colaborador |
| GitHub Desktop | Interfaz visual para Git | Opcional |
| NVM / administrador equivalente | Seleccionar versión Node | Opcional |
| Android Studio, SDK, Emulator y ADB | Preparar y probar Android | Necesarios para la ruta con emulador |
| Expo Go | Iteración de la base móvil | Limitado a sus capacidades incluidas |
| Compilación de desarrollo | Configuración y módulos nativos propios | Pendiente de incorporar |
| EAS CLI | Compilación/distribución mediante EAS | Configuración pendiente |
| Docker Compose | PostgreSQL local reproducible | Requerido para API y pruebas HTTP del entregable 1 |

Las capacidades oficiales y motivos se enlazan desde [fundamentos](14-decision-rationale.md).

## Referencia histórica de la estación inicial

El 2026-08-26 se documentó la puesta en marcha con Node.js `22.21.1`, Android API 36, Expo Go y el emulador `Condominio_API_36`. Las instalaciones originales de Firebase CLI y EAS CLI no son requisitos actuales para iniciar el móvil o la API local.

Rutas históricas:

~~~text
E:/Desarrollo/Proyectos
E:/Desarrollo/Cache/npm
E:/Desarrollo/Cache/gradle
E:/AndroidAVD
~~~

Esas rutas y el nombre del emulador no son obligatorios. La carpeta de trabajo de esta revisión es `C:/Desarrollo/Proyectos/nexora`; cada colaborador puede escoger la suya.

## Plataformas y pruebas

Android puede desarrollarse desde Windows, macOS o Linux. La compilación iOS local requiere macOS y Xcode. La salida web permite revisar parte de la interfaz, pero no valida cámara, ubicación, notificaciones ni segundo plano.

La existencia de soporte multiplataforma no acredita que Nexora haya sido probado en todas las plataformas. Consultar las comprobaciones fechadas del estado actual.

## Configuración por aplicación

- `apps/mobile` usa `EXPO_PUBLIC_API_URL` como contrato para el futuro cliente HTTP.
- `apps/api` contiene la base NestJS; carga `apps/api/.env.local` o `.env`, valida `NODE_ENV` y `PORT`, y usa el puerto 3000 por defecto.
- PostgreSQL, Prisma y Docker no están configurados.
- `packages` sigue reservado para consumidores compartidos reales.

Las variables públicas de Expo no pueden guardar secretos del servidor. Los archivos de ejemplo se versionan; los `.env` y credenciales reales pertenecen a cada entorno.

Seguir [instalación](05-installation-and-setup.md) para preparar una computadora y [API](../apps/api/README.md) para ejecutar su base.
