# 14. Por qué Nexora está diseñado así

Revisión documental: 2026-09-08. Curso: **Desarrollo de Aplicaciones Móviles**. Plan: cuatro entregables acumulativos.

## Evidencia y alcance

Esta explicación contrasta ADR, historial Git, requisitos y archivos actuales con documentación oficial. La conversación [Tecnologías recomendadas](https://chatgpt.com/c/6a8ed7c2-b5bc-83e9-9364-cb234468a684) aporta el contexto: se pidió que Nexora fuera profesional, escalable y pudiera seguir evolucionando. Es una referencia personal; el equipo puede comprender las decisiones con los documentos del repositorio.

Se distingue entre **motivo registrado**, **evaluación técnica de esta revisión** y **decisión pendiente**. Una dependencia generada por una plantilla no demuestra que el equipo comparara alternativas. Tampoco se atribuyen al profesor tecnologías que no aparecen como exigencias en los requisitos disponibles.

Las versiones están en [tecnologías](02-tech-stack.md); la implementación y comprobaciones, en [estado actual](06-current-status.md). Aquí se explican las razones y sus límites.

## 1. Producto y funciones

El problema del caso es la dispersión de procesos residenciales entre mensajes, llamadas y registros manuales. Nexora reúne comunicación, participación, visitas, incidencias y alertas porque comparten usuarios, viviendas, permisos e historial. La [identidad](00-product-identity.md) es una narrativa académica; no documenta una empresa real ni una investigación de campo.

| Elemento | Por qué existe | Requisitos |
| --- | --- | --- |
| Administración/directiva, residente y seguridad | Cada actor tiene acciones distintas; ver una pantalla no concede permiso para ejecutarlas | RF-USR-03 |
| Usuarios, residentes y unidades separados | Identidad de acceso, pertenencia residencial y vivienda tienen responsabilidades diferentes | RF-USR-01, RF-USR-05 |
| Hasta tres contactos | Es una regla explícita del caso, no una limitación tecnológica | RF-USR-04 |
| Avisos y encuestas | Distinguen comunicación oficial de decisiones comunitarias | RF-COM-01 a RF-COM-08 |
| QR de visitantes | Facilita presentar y escanear una autorización; la seguridad depende del token y del servidor | RF-VIS-01 a RF-VIS-08, RNF-03 |
| Alertas y seguimiento | Conectan solicitud de ayuda, destinatarios y atención | RF-ALT-01 a RF-ALT-07 |
| Incidencias con foto | Permiten describir un problema, asignarle estado y conservar evidencia | RF-INC-01 a RF-INC-03 |

Tres segundos, 99 % de disponibilidad y 500 unidades son objetivos de los [requisitos](08-requirements.md). Deben definirse y medirse; no son resultados obtenidos.

## 2. React Native y Expo

**Motivo registrado:** [ADR-001](adr/ADR-001-react-native-expo.md) prioriza Android con posibilidad de iOS, reutilización de código y acceso a cámara, ubicación, notificaciones y funciones del dispositivo.

React Native permite interfaces nativas con React y funcionalidades compartidas entre plataformas. Expo reúne herramientas y bibliotecas para reducir la configuración inicial. React Native recomienda comenzar aplicaciones nuevas con un framework como Expo; eso respalda el enfoque, sin demostrar que sea la única opción válida. [React Native](https://reactnative.dev/docs/environment-setup).

**Alternativas registradas:** Kotlin para Android, Flutter y React Native sin framework. Kotlin encaja con un alcance centrado en Android; Flutter también permite una solución multiplataforma; prescindir de Expo traslada más integración al equipo. La elección favorece TypeScript y las herramientas ya adoptadas. No hay un ensayo propio de rendimiento ni evidencia suficiente para afirmar que el equipo dominaba una alternativa más que otra.

**Costo:** respetar compatibilidad del SDK, probar dispositivos y configurar capacidades nativas. React y React Native se coordinan con Expo, sin actualizar cada biblioteca por separado. Se consultó específicamente [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/).

### Expo Go, compilaciones y dispositivos

Expo Go permitió comprobar el arranque inicial. Una compilación de desarrollo propia permite bibliotecas y configuración nativas adicionales. EAS ofrece servicios opcionales de compilación y distribución; usar Expo no decide el hosting del backend ni exige publicar en tiendas. [Compilaciones de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/).

La cámara debe comprobarse al introducir QR en el entregable 2. Las notificaciones remotas en Android requieren una compilación de desarrollo según el SDK. [Cámara SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/camera/), [notificaciones SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/notifications/).

El emulador facilita repetir pruebas; un teléfono permite evaluar permisos, cámara, vibración, red y segundo plano reales. La salida web ayuda a revisar interfaces, pero no acredita comportamientos nativos ni supone un portal web incluido en el alcance.

## 3. React, Expo Router y TypeScript

React organiza componentes y estado visual. Expo Router organiza navegación a partir de archivos; `src/app` es esa frontera en Nexora. Router ya estaba en la base Expo: no hay un ADR que demuestre una comparación independiente con otras bibliotecas de navegación. [Expo Router](https://docs.expo.dev/router/introduction/).

**Motivo registrado de TypeScript:** [ADR-002](adr/ADR-002-typescript.md) busca contratos explícitos, refactorización y detección temprana de errores en un dominio con varias entidades y colaboradores. Usarlo en móvil y API reduce el cambio de lenguaje.

Los tipos se comprueban durante el desarrollo y no validan automáticamente respuestas HTTP, permisos o entradas en ejecución. Sigue siendo necesaria validación del servidor. La configuración estricta ayuda a detectar errores; no prueba por sí sola la corrección del programa. [TypeScript](https://www.typescriptlang.org/docs/handbook/2/basic-types.html).

## 4. Capas y responsabilidad de las reglas

**Motivo registrado:** RNF-07 exige separar presentación, negocio y datos; [ADR-004](adr/ADR-004-layered-architecture.md) concreta esa separación.

| Área | Responsabilidad | Ejemplo |
| --- | --- | --- |
| Presentation | Pantallas, interacción y estado visual | Mostrar una sesión expirada |
| Domain | Entidades, reglas y contratos independientes de proveedores | Rechazar más de tres contactos |
| Data | Implementar contratos y convertir datos externos | Convertir una respuesta de perfil al modelo del dominio |
| Infraestructura | Servicios concretos detrás de adaptadores | Cliente HTTP o almacenamiento del dispositivo |

La separación permitió cambiar Firebase por una API propia sin reescribir las entidades del móvil. Su costo es más archivos y disciplina de dependencias.

Las carpetas reservadas no representan casos de uso implementados. Parte de la plantilla sigue en `src/components` y `src/hooks`; se reorganizará al construir las pantallas de negocio. La API debe repetir permisos y reglas aunque el móvil valide para mejorar la experiencia: un cliente puede intentar llamar directamente al servidor.

## 5. Por qué Firebase dejó de ser el backend principal

**Decisión inicial:** [ADR-003](adr/ADR-003-firebase.md) favorecía autenticación, tiempo real y almacenamiento administrados para reducir infraestructura y empezar rápido.

**Cambio registrado:** [ADR-005](adr/ADR-005-nestjs-postgresql.md), formalizado el 2026-09-02, priorizó servidor propio, relaciones, transacciones y auditoría. La conversación confirma el interés por ampliar el producto. Firebase aún no se había integrado: cambió el diseño, sin migrar una base existente.

Esto no demuestra que Firebase sea incapaz de sostener un producto profesional. Se aceptó más implementación y operación a cambio de contratos y reglas explícitas en un backend propio.

Supabase también fue considerado. Dispone de PostgreSQL y puede utilizarse junto a un servidor propio; no es incompatible con NestJS. No se ha elegido como proveedor. [Base de datos de Supabase](https://supabase.com/docs/guides/database/overview).

## 6. NestJS y monolito modular

NestJS aporta módulos, inyección de dependencias y organización de controladores y servicios sobre Node.js. Nexora busca separar usuarios, visitas, encuestas y alertas dentro de una API del equipo. Express se conserva como adaptador HTTP predeterminado de la base implementada. [NestJS](https://docs.nestjs.com/).

**Motivo registrado:** centralizar permisos y negocio con TypeScript. No existe comparación medida contra Express directo, Fastify, Spring o .NET. Mantener Express en la plantilla no acredita una elección por rendimiento.

Un **monolito modular** es una aplicación de servidor organizada por funciones. [ADR-005](adr/ADR-005-nestjs-postgresql.md) evita añadir comunicación distribuida y múltiples despliegues durante cuatro entregables.

Escalar exige consultas, índices, pruebas y observabilidad. Agregar instancias requiere resolver también sesiones, conexiones y distribución de eventos entre ellas. Redis, colas y Kubernetes necesitan justificación; no forman parte de la base actual.

## 7. PostgreSQL, Prisma y fotografías

**PostgreSQL:** las relaciones entre unidades, residentes, votos y visitas favorecen una base relacional. Claves foráneas y restricciones conservan integridad; transacciones permiten confirmar operaciones relacionadas como una unidad. [Restricciones](https://www.postgresql.org/docs/current/ddl-constraints.html), [transacciones](https://www.postgresql.org/docs/current/tutorial-transactions.html).

En Nexora, dos escaneos simultáneos no deberían consumir dos veces el mismo pase. Un voto duplicado debe rechazarse según la regla aprobada. Elegir PostgreSQL no implementa esas garantías: faltan esquema, restricciones, transacciones y pruebas de concurrencia.

**Prisma:** ADR-005 lo acepta para acceso a datos con TypeScript y evolución del esquema mediante migraciones. Se espera reducir código repetitivo; hay que aprender la herramienta y revisar consultas y migraciones. No existe una comparativa propia que lo declare superior a otros ORM. [Integración de Prisma en NestJS](https://docs.nestjs.com/recipes/prisma).

Para el entregable 1 se fijan Prisma CLI y Client en `6.12.0`. La evaluación comenzó con 7.10, pero `npm audit` detectó avisos altos en la cadena del CLI desde 6.13; 6.12 ofrece el esquema, migraciones, seed y cliente requeridos sin esos avisos. El proyecto genera el cliente antes de los checks y no adopta Prisma 8 mientras siga como versión candidata. [Integración de Prisma en NestJS](https://docs.nestjs.com/recipes/prisma).

PostgreSQL se ejecuta mediante la imagen oficial `18.6-alpine`. A partir de PostgreSQL 18 la imagen cambió su volumen declarado a `/var/lib/postgresql`; Compose monta esa ruta para que los datos sobrevivan a la recreación del contenedor. [Imagen oficial de PostgreSQL](https://hub.docker.com/_/postgres).

**Autenticación:** el primer corte usa identidad propia porque ya necesita integrar roles, perfil y sesiones con la API propia sin configurar un proveedor externo. La contraseña usa scrypt, el access token es corto y el refresh token se rota y puede revocarse. SecureStore protege la copia nativa. La comparación, costos y alcance están en [ADR-007](adr/ADR-007-autenticacion-y-sesiones.md).

**Fotografías:** ADR-005 separa archivos en almacenamiento de objetos y referencias/metadatos en PostgreSQL. Esto mantiene independiente la gestión de archivos y datos relacionales. Proveedor, límites, permisos y retención siguen pendientes.

## 8. REST, OpenAPI, WebSockets y notificaciones

| Mecanismo previsto | Qué resuelve | Qué no acredita por sí solo |
| --- | --- | --- |
| REST sobre HTTPS | Consultas y operaciones, como perfil o invitaciones | Permisos correctos e integridad |
| OpenAPI y Swagger | Contrato de entradas, respuestas y errores compartido con el móvil | Que los consumidores cumplan el contrato |
| WebSockets | Eventos hacia clientes conectados | Recepción con la aplicación suspendida |
| FCM y entrega nativa correspondiente | Notificaciones según plataforma, permisos y estado | Entrega garantizada en tres segundos |

NestJS integra [OpenAPI](https://docs.nestjs.com/openapi/introduction) y [gateways WebSocket](https://docs.nestjs.com/websockets/gateways). La base ya publica Swagger y OpenAPI; los DTO de cada función se añadirán con sus módulos. El adaptador WebSocket y la integración concreta de push siguen pendientes; no se presupone Socket.IO instalado.

La alerta deberá persistirse antes de avisar. Al reconectar habrá que consultar el estado real y evitar duplicados. Es una consecuencia del diseño, aún por implementar.

En Android, FCM diferencia prioridades y puede retrasar mensajes por el estado de energía. Deben medirse primer plano, segundo plano, conectividad y permisos. [Prioridad FCM](https://firebase.google.com/docs/cloud-messaging/android-message-priority).

El correo a contactos de RF-ALT-05 es una **simulación**; no exige un proveedor real.

## 9. Monorepositorio, npm, Docker y colaboración

**Motivo registrado:** [ADR-006](adr/ADR-006-monorepo.md) considera cuatro colaboradores, un producto y calendario comunes. Un repositorio permite revisar juntos el cambio de API y su consumo móvil.

`apps/mobile` y `apps/api` conservan dependencias y procesos propios. `packages` recibirá código con varios consumidores reales. Compartir repositorio no autoriza a importar Prisma o NestJS en el móvil.

npm workspaces administra paquetes desde la raíz y el lockfile fija la resolución de dependencias. Expo detecta el monorepositorio mediante workspaces. [npm](https://docs.npmjs.com/cli/v10/using-npm/workspaces/), [Expo](https://docs.expo.dev/guides/monorepos/).

Docker Compose describe PostgreSQL local, su health check, puerto y volumen reproducible en `compose.yaml`. [Docker Compose](https://docs.docker.com/compose/intro/compose-application-model/).

Git conserva historia; ramas y Pull Requests agrupan cambios revisables. GitHub aloja la colaboración. SSH es una opción de autenticación y HTTPS sigue siendo válido. GitHub Desktop y VS Code son herramientas opcionales.

Los ADR explican decisiones, los planes ordenan ejecución y el estado registra hechos. Versionar documentación junto al código evita depender únicamente de conversaciones.

## 10. Pruebas y herramientas heredadas

El móvil tiene Jest con `jest-expo` y pruebas del límite de contactos. Expo documenta ese preset para adaptar Jest a su entorno. [Pruebas con Expo](https://docs.expo.dev/develop/unit-testing/).

La API conserva Vitest, `@nestjs/testing` y Supertest para reglas aisladas y rutas HTTP, acordes con la documentación actual de NestJS. Se verifican configuración, health, OpenAPI y errores; todavía no hay pruebas de negocio o persistencia. Su presencia inicial en el código generado no demuestra una comparación propia entre runners. [Pruebas con NestJS](https://docs.nestjs.com/fundamentals/testing).

ESLint en móvil, Oxlint en API y Prettier en API revisan o dan formato al código. Se conservan porque ya operan en sus ecosistemas y el check raíz coordina sus resultados; una unificación futura necesitaría demostrar un beneficio concreto.

Bibliotecas visuales, animaciones y módulos web sirven principalmente a la plantilla. Se retiraron `@nestjs/mau`, el script `deploy` y `vite-tsconfig-paths`: no había hosting contratado y Vite ya cubre la resolución de alias utilizada. El reemplazo transitivo de `multer` 2.2.0 por 2.3.0 responde a avisos de seguridad concretos y se valida con instalación limpia y pruebas HTTP.

## 11. Cuatro entregables y organización del curso

El [plan académico](12-academic-advances.md) sigue dependencias: acceso y perfil con datos reales; comunicación y visitas; alertas e incidencias; calidad y entrega integral.

API y base de datos apoyan el objetivo móvil del curso. Cada corte necesita una demostración desde la aplicación. Las responsabilidades pueden rotar y cada integrante debe explicar el flujo completo.

La distribución es una planificación del proyecto: faltan rúbrica, fechas y evaluación individual. Las dependencias y decisiones pendientes están en [15-pending-decisions.md](15-pending-decisions.md).
