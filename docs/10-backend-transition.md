# 10. Transición al backend propio

## Propósito

Este documento convierte la decisión de [ADR-005](adr/ADR-005-nestjs-postgresql.md) en una secuencia de entregables verificables. Distingue el estado real del móvil de la arquitectura futura para evitar documentar como terminado algo que aún no existe.

## Estado de la transición

### Completado en `nexora-mobile`

- Domain Core desacoplado de la infraestructura;
- decisión de Firebase conservada como registro histórico y marcada como reemplazada;
- NestJS y PostgreSQL aceptados como backend principal;
- arquitectura, stack, roadmap y guía de instalación actualizados;
- variable pública `EXPO_PUBLIC_API_URL` definida como contrato de configuración;
- área `src/data/api` reservada para el futuro adaptador HTTP.

### Pendiente

- crear el repositorio `nexora-api`;
- inicializar NestJS y fijar sus versiones;
- configurar PostgreSQL, Prisma y Docker;
- definir autenticación mediante un ADR separado;
- crear OpenAPI y el endpoint de salud;
- implementar el primer corte vertical de usuarios/residentes;
- implementar el cliente HTTP en `nexora-mobile`;
- añadir pruebas de contrato e integración.

## Responsabilidad de cada repositorio

### `nexora-mobile`

- interfaz y navegación;
- experiencia móvil;
- validaciones inmediatas para el usuario;
- acceso a cámara, ubicación, biometría y notificaciones;
- contratos de repositorio del Domain;
- adaptadores HTTP dentro de Data;
- almacenamiento seguro de tokens en el dispositivo.

### `nexora-api`

- autenticación y autorización del servidor;
- reglas de negocio definitivas;
- persistencia y transacciones;
- generación y consumo seguro de pases QR;
- auditoría;
- publicación de eventos;
- envío de notificaciones;
- contrato OpenAPI.

## Arquitectura objetivo

```text
Presentation
     |
     v
Mobile Domain
     ^
     |
Data repository implementation
     |
     | HTTPS / WebSocket
     v
NestJS API
     |
     +-- PostgreSQL / Prisma
     +-- FCM
     +-- Object Storage
```

## Orden de los siguientes entregables

### Entregable A — Cerrar la transición del móvil

**Estado: completado mediante el PR #4**

- revisar esta documentación;
- validar TypeScript y Expo;
- publicar la rama;
- abrir Pull Request;
- fusionar únicamente después de revisión.

### Entregable B — Baseline de `nexora-api`

- repositorio y políticas Git;
- NestJS con TypeScript estricto;
- configuración validada;
- PostgreSQL reproducible mediante Docker Compose;
- Prisma con primera migración vacía o de infraestructura;
- Swagger/OpenAPI;
- `GET /health`;
- pruebas y CI;
- guía de instalación para Windows, macOS y Linux.

### Entregable C — Autenticación

- ADR comparando proveedor administrado y autenticación propia;
- modelo de identidad y sesión;
- autorización por roles;
- manejo seguro de access/refresh tokens;
- pruebas de rutas protegidas.

### Entregable D — Primer corte vertical

Implementar una funcionalidad pequeña de extremo a extremo antes de generar todos los módulos:

```text
PostgreSQL
  -> Prisma
  -> servicio NestJS
  -> endpoint OpenAPI
  -> repositorio Data del móvil
  -> caso de uso Domain
  -> pantalla mínima
```

El corte recomendado es consultar el perfil del usuario y su asociación residente-unidad.

## Configuración de entornos

El móvil recibe la URL base mediante:

```text
EXPO_PUBLIC_API_URL
```

La variable es pública porque termina incluida en la aplicación. No debe contener contraseñas, tokens, claves privadas ni credenciales de base de datos.

Valores habituales durante desarrollo:

| Cliente | URL hacia una API local en el puerto 3000 |
| --- | --- |
| Web o simulador iOS en la misma computadora | `http://localhost:3000/api/v1` |
| Android Emulator estándar | `http://10.0.2.2:3000/api/v1` |
| Dispositivo físico | `http://IP_LAN_DE_LA_COMPUTADORA:3000/api/v1` |
| Entorno remoto | URL HTTPS asignada al entorno |

La API aún no existe. Estos valores documentan el contrato futuro y no implican que las llamadas HTTP ya estén implementadas.

## Condición de finalización

La transición arquitectónica estará completamente operativa cuando:

1. ambos repositorios puedan instalarse desde cero siguiendo su documentación;
2. PostgreSQL pueda levantarse de forma reproducible;
3. `GET /health` responda;
4. Swagger exponga el contrato;
5. el móvil pueda comunicarse con la API usando `EXPO_PUBLIC_API_URL`;
6. CI valide los dos repositorios;
7. no existan secretos versionados.

La secuencia detallada para completar el primer avance académico se mantiene en [11-first-advance-plan.md](11-first-advance-plan.md).
