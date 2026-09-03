# 11. Plan del primer avance

## Objetivo

El primer avance debe demostrar un flujo funcional completo entre la aplicación móvil, la API y PostgreSQL. El corte elegido es la autenticación y consulta del perfil de un residente con su unidad y sus contactos de emergencia.

Este avance no termina todos los módulos de Nexora. Su propósito es construir una base reproducible y comprobar que la arquitectura acordada funciona de extremo a extremo antes de incorporar avisos, encuestas, visitantes, alertas e incidencias.

## Resultado demostrable

Al terminar el avance, un colaborador debe poder:

1. clonar el monorepositorio de Nexora en una computadora nueva;
2. instalar todos los workspaces y configurar las variables de entorno a partir de sus archivos de ejemplo;
3. levantar PostgreSQL mediante Docker Compose;
4. aplicar las migraciones y cargar datos de demostración;
5. iniciar la API y comprobar `GET /health` y Swagger;
6. ejecutar la aplicación móvil;
7. iniciar sesión con una cuenta de prueba;
8. consultar desde PostgreSQL el perfil, rol, unidad y hasta tres contactos de emergencia;
9. cerrar la sesión sin dejar credenciales sensibles expuestas.

## Pasos de implementación

### Paso 1 — Cerrar y documentar el punto de partida

**Estado: implementado y validado en `chore/monorepo-transition`; integración a `main` pendiente**

- verificar que `main` coincida con `origin/main`;
- confirmar la integración del PR #4 y del Domain Core;
- corregir referencias documentales que presentaban el merge como pendiente;
- fijar el alcance, orden y condición de finalización del primer avance;
- comparar monorepositorio y repositorios separados mediante variables explícitas;
- registrar la decisión en ADR-006;
- trasladar el móvil a `apps/mobile` y configurar npm workspaces;
- reservar `apps/api` y `packages` sin presentar código futuro como implementado;
- iniciar el trabajo posterior desde una rama separada de `main`.

**Evidencia esperada:** monorepositorio reproducible, móvil funcional desde `apps/mobile`, documentación coherente y este plan versionado.

### Paso 2 — Inicializar `apps/api`

- inicializar NestJS con TypeScript estricto;
- definir scripts, versión de Node.js y administrador de paquetes;
- añadir `.env.example` y documentación específica del workspace;
- integrar sus scripts con la raíz y el CI del monorepositorio;
- mantener un despliegue independiente del móvil.

**Evidencia esperada:** el workspace de API instala, compila y ejecuta desde una computadora limpia.

### Paso 3 — Levantar PostgreSQL y Prisma

- crear `compose.yaml` para desarrollo local;
- configurar PostgreSQL sin versionar credenciales reales;
- integrar Prisma;
- crear la migración inicial;
- añadir comandos de migración, reinicio controlado y seed;
- documentar almacenamiento persistente y puertos.

**Evidencia esperada:** PostgreSQL se levanta de forma reproducible y Prisma puede conectarse.

### Paso 4 — Completar el baseline de la API

- validar variables de entorno al arrancar;
- establecer el prefijo `/api/v1`;
- añadir validación global de entradas;
- normalizar respuestas de error;
- implementar `GET /health`;
- publicar Swagger/OpenAPI;
- añadir pruebas básicas y CI.

**Evidencia esperada:** health check, documentación OpenAPI, compilación y pruebas correctas.

### Paso 5 — Decidir la autenticación

- comparar autenticación propia y proveedor administrado;
- documentar amenazas, costos y responsabilidades;
- decidir access tokens, refresh tokens y revocación;
- registrar la decisión en un ADR antes de implementarla.

**Evidencia esperada:** ADR de autenticación aceptado y sin decisiones críticas implícitas.

### Paso 6 — Implementar autenticación y roles

- crear identidad, credenciales y sesiones;
- almacenar contraseñas mediante un algoritmo adecuado;
- implementar inicio, renovación y cierre de sesión;
- proteger endpoints con autenticación y autorización;
- incorporar los roles administrador/directiva, residente y seguridad;
- preparar cuentas de demostración sin credenciales de producción.

**Evidencia esperada:** pruebas de rutas públicas, protegidas y restringidas por rol.

### Paso 7 — Implementar usuarios, residentes y unidades en la API

- modelar condominios, unidades, usuarios, residentes y contactos;
- aplicar la regla de máximo tres contactos de emergencia;
- crear las migraciones y datos seed;
- implementar el endpoint del perfil autenticado;
- documentar contratos, permisos y errores en OpenAPI;
- probar reglas de negocio y persistencia.

**Evidencia esperada:** el perfil se obtiene desde PostgreSQL y respeta las reglas del dominio.

### Paso 8 — Conectar el móvil con la API

- leer la URL desde `EXPO_PUBLIC_API_URL`;
- crear el cliente HTTP dentro de Data;
- implementar los contratos de repositorio del Domain;
- manejar tokens mediante almacenamiento apropiado para el dispositivo;
- definir errores de red, autenticación y servidor;
- mantener Presentation desacoplada del cliente HTTP.

**Evidencia esperada:** la aplicación consume la API sin acceder directamente a PostgreSQL.

### Paso 9 — Construir el primer corte vertical

- crear la pantalla de inicio de sesión;
- mantener la sesión del usuario;
- consultar el perfil autenticado;
- mostrar rol, condominio, unidad y contactos;
- representar carga, ausencia de datos, error y sesión expirada;
- permitir cerrar sesión.

**Evidencia esperada:** demostración móvil completa con datos reales del seed.

### Paso 10 — Validar y entregar el avance

- ejecutar pruebas unitarias, de integración y de contrato necesarias;
- comprobar instalación desde cero en otra computadora o entorno limpio;
- verificar que no existan secretos versionados;
- actualizar diagramas, README, estado, roadmap y changelog;
- preparar cuentas seed, guion y evidencias de demostración;
- revisar y fusionar los Pull Requests manteniendo `main` estable.

**Evidencia esperada:** monorepositorio y workspaces reproducibles, con una demostración repetible del avance.

## Orden obligatorio

```text
1. Punto de partida
        ↓
2. Workspace API
        ↓
3. PostgreSQL y Prisma
        ↓
4. Baseline NestJS
        ↓
5. ADR de autenticación
        ↓
6. Autenticación y roles
        ↓
7. Residentes y unidades
        ↓
8. Cliente móvil
        ↓
9. Corte vertical
        ↓
10. Validación y entrega
```

No se comenzarán módulos del segundo avance para ocultar una integración incompleta del primero. Si un paso revela un problema, se corrige en la capa responsable antes de continuar.

## Fuera del primer avance

- avisos y encuestas;
- votaciones;
- visitantes y QR;
- alertas y WebSockets;
- FCM;
- geolocalización;
- incidencias y fotografías;
- biometría;
- pruebas de carga y distribución final.

Esos elementos corresponden a los avances posteriores del plan académico.

## Definición de terminado

El primer avance solo se considera terminado cuando el siguiente flujo funciona de extremo a extremo:

```text
PostgreSQL
  -> Prisma
  -> NestJS
  -> OpenAPI/HTTP
  -> repositorio Data del móvil
  -> caso de uso Domain
  -> pantalla de perfil
```

Que una pantalla use datos simulados, que Swagger responda sin integración móvil o que el móvil compile sin conectarse a la API son resultados parciales, no la finalización del avance.
