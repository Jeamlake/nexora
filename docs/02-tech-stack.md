# 02. Inventario tecnológico

Corte: **2026-09-10**. Este inventario describe el primer flujo móvil–API–PostgreSQL implementado en el monorepositorio. Las razones y alternativas se desarrollan en [fundamentos](14-decision-rationale.md); los resultados de comprobación están en [estado](06-current-status.md).

## Cómo leer el inventario

- **Integrado:** presente en el historial local de `main`.
- **Implementado:** presente en el código y cubierto por las comprobaciones indicadas.
- **Aceptado:** decisión registrada, implementación pendiente.
- **Heredado:** herramienta o configuración de plantilla; no demuestra una evaluación propia.
- **Pendiente:** todavía requiere elección o confirmación.

`package.json` declara rangos; `package-lock.json` fija versiones resueltas. “Declarado” no significa “recomendado actualmente” ni “validado en todos los dispositivos”.

## Aplicación móvil

Fuente: [package.json móvil](../apps/mobile/package.json), [configuración Expo](../apps/mobile/app.json) y lockfile raíz.

| Tecnología | Versión declarada local | Uso y estado |
| --- | --- | --- |
| React Native | `0.86.3` | Base móvil integrada; Android/iOS |
| React | `19.2.3` | Componentes y estado visual |
| Expo | `~57.0.21` | SDK 57; parche esperado por Expo Doctor |
| Expo Router | `~57.0.20` | Navegación por archivos; parche esperado por Expo Doctor |
| Expo SecureStore | `~57.0.3` | Almacenamiento cifrado de tokens en Android/iOS |
| TypeScript | `~6.0.3` | Lenguaje con modo estricto |
| React DOM / React Native Web | `19.2.3` / `~0.21.0` | Salida web de la plantilla; no define un portal de negocio |

El [SDK 57](https://docs.expo.dev/versions/v57.0.0/) vincula React Native 0.86, React 19.2.3 y React Native Web 0.21.0. Su mínimo Node documentado es 22.13.x; el repositorio exige una versión más alta, indicada abajo.

### Bibliotecas auxiliares del móvil

Estas dependencias están declaradas. Se agrupan por su función; el estado “heredado” no implica que deban eliminarse sin revisar consumidores.

| Grupo | Paquetes | Motivo/uso observado |
| --- | --- | --- |
| Interfaz e integración visual | `@expo/ui`, `expo-symbols`, `expo-glass-effect`, `expo-font` | Apoyo de la plantilla y navegación; no hay sistema visual de negocio aprobado |
| Imágenes y arranque | `expo-image`, `expo-splash-screen` | Imágenes y pantalla/animación de inicio de la plantilla |
| Dispositivo y aspecto del sistema | `expo-device`, `expo-constants`, `expo-status-bar`, `expo-system-ui` | Información/configuración y presentación; no son módulos de negocio |
| Enlaces | `expo-linking`, `expo-web-browser` | Integración de navegación y apertura de enlaces |
| Navegación y zonas seguras | `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` | Infraestructura visual y navegación |
| Animación | `react-native-reanimated`, `react-native-worklets` | Animación existente de la plantilla |
| Configuración experimental | `typedRoutes` y `reactCompiler` en `app.json` | Activados; no existe un ADR independiente que justifique su selección |

Cámara, ubicación, notificaciones y biometría siguen pendientes. SecureStore está integrado exclusivamente para la sesión del entregable 1.

## API

Fuente: [package.json de API](../apps/api/package.json). NestJS fue aceptado en ADR-005 y la base HTTP está implementada en el workspace `@nexora/api`.

| Tecnología | Declaración | Responsabilidad |
| --- | --- | --- |
| `@nestjs/common` y `@nestjs/core` | `^12.0.1` | Módulos, controladores y servicios; lockfile resuelve `12.0.1` |
| `@nestjs/platform-express` | `^12.0.1` | Adaptador HTTP predeterminado; el lockfile reemplaza su `multer` 2.2.0 por 2.3.0 |
| `@nestjs/config` y Joi | `^12.0.0` / `^18.2.8` | Carga y validación de entorno, base y sesiones |
| `@nestjs/swagger` | `^12.0.1` | Swagger y documento OpenAPI |
| `@nestjs/jwt` | `12.0.1` | Firma y verificación de access tokens |
| Prisma Client / CLI | `6.12.0` | Acceso tipado, esquema, migración y seed; versión sin avisos npm al corte |
| `class-validator` / `class-transformer` | `^0.15.1` / `^0.5.1` | Validación y transformación global de DTO |
| TypeScript | `^6.0.2` | Compilación de API con modo estricto completo |
| `reflect-metadata` | `^0.2.2` | Metadatos utilizados por decoradores/inyección de dependencias |
| `rxjs` | `^7.8.1` | Dependencia de la plataforma NestJS |
| ESM / NodeNext | Configuración | `type: module` e imports relativos con extensión `.js` |

La API expone salud con comprobación de base, Swagger/OpenAPI, login, refresh, logout, perfil y listado restringido de residentes. Los DTO documentan contratos y los guardas comprueban sesión y rol.

## Datos y servicios previstos

| Elemento | Estado | Responsabilidad |
| --- | --- | --- |
| PostgreSQL | `18.6-alpine` en Compose | Relaciones, sesiones e integridad del perfil |
| Prisma | `6.12.0` | Cliente, esquema, migraciones y seed |
| Docker Compose | Implementado | Base local y volumen reproducibles |
| REST / HTTPS | Primer flujo implementado | Autenticación y perfil bajo `/api/v1` |
| OpenAPI / Swagger | Base implementada | Contrato y documentación de API |
| WebSockets | Aceptado, adaptador pendiente | Eventos para clientes conectados |
| FCM / integración push por plataforma | Aceptado, sin implementar | Notificaciones; entrega y permisos por validar |
| Almacenamiento de objetos | Proveedor pendiente | Fotografías y otros archivos |
| Autenticación | Propia para avance 1 | Scrypt, JWT corto, refresh opaco, rotación y revocación |
| Hosting, EAS y distribución | Configuración/proveedores pendientes | Operación de API y artefactos móviles |

Firebase como backend completo fue reemplazado; se conserva su historia en [ADR-003](adr/ADR-003-firebase.md). Supabase no está seleccionado y sigue siendo una alternativa posible de servicios administrados. Ninguna herramienta acredita automáticamente tres segundos, 99 % o 500 unidades.

## Pruebas y calidad

| Área | Herramientas presentes | Alcance actual |
| --- | --- | --- |
| Móvil | Jest `~29.7.0`, `jest-expo ~57.0.5`, `@react-native/jest-preset 0.86.3`, `@types/jest` | Entidad, caso de uso, cliente HTTP y mapeo |
| Móvil | ESLint `^9.39.5` y `eslint-config-expo ~57.0.2` | Revisión estática de Expo |
| API | Vitest `^4.1.2`, `@nestjs/testing ^12.0.1`, Supertest `^7.0.0` | Unitarias y HTTP contra PostgreSQL |
| API | `@vitest/coverage-v8` y resolución nativa de Vite | Cobertura disponible; sin porcentaje mínimo definido |
| API | Oxlint `^1.58.0`, Prettier `^3.4.2` | Lint y comprobación de formato |
| Transversal | TypeScript, Expo Doctor, scripts npm y GitHub Actions | Ver [cobertura real de check](06-current-status.md) |

Tipos `@types/react`, `@types/express`, `@types/node` y `@types/supertest` apoyan el análisis estático. `@nestjs/cli`, `@nestjs/schematics` y `source-map-support` son herramientas de desarrollo. Se retiraron `@nestjs/mau`, `deploy` y `vite-tsconfig-paths` porque no respondían a una decisión vigente o duplicaban soporte nativo.

## Entorno y organización

| Elemento | Referencia actual | Motivo |
| --- | --- | --- |
| Node.js | `>=22.22.3 <23`; estación comprobada `22.22.3` | Consistencia del entorno; requisito del repositorio |
| npm | `>=10`; `packageManager: npm@10.9.8` | Gestor común del equipo |
| npm workspaces | `apps/*` y `packages/*` | Instalación y scripts desde una raíz |
| Lockfile | Uno, en la raíz | Versiones resueltas compartidas |
| Android API 36 | Referencia del emulador inicial | Pruebas Android reproducibles |
| Expo Go | Base móvil inicial | Iteración; no cubre todas las integraciones nativas |
| Compilación de desarrollo | Pendiente | Bibliotecas/configuración nativas propias |
| Git / GitHub | Configurados | Historial y revisión |
| VS Code, GitHub Desktop, NVM | Opcionales | Comodidad local, sin imponer un sistema operativo |

No hay evidencia de un estudio separado que motivara exactamente el parche mínimo Node 22.22.3; se registra el requisito observado sin inventar su historia. La instalación sigue [05-installation-and-setup.md](05-installation-and-setup.md).
