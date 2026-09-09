# 09. Modelo de dominio inicial

## Estado

Este documento describe el **primer modelo de dominio implementado** en Nexora.

No representa todavía autenticación, persistencia, comunicación con la API, pantallas ni flujos funcionales completos.

## Objetivo

Modelar las entidades mínimas necesarias para iniciar el módulo de usuarios y residencia sin acoplar el dominio a una API, base de datos o interfaz concreta.

## Entidades implementadas

### User

Representa la identidad de un usuario dentro de Nexora.

Roles admitidos:

- `ADMIN_DIRECTIVE`
- `RESIDENT`
- `SECURITY_GUARD`

El modelo contempla:

- identificador;
- nombre visible;
- correo opcional;
- celular opcional;
- rol;
- estado activo/inactivo;
- fecha de creación;
- último inicio de sesión opcional.

### Resident

Representa a un residente asociado a:

- un usuario (`userId`);
- una unidad (`unitId`);
- un estado `ACTIVE` o `INACTIVE`;
- una colección de contactos de emergencia.

La regla de dominio `MAX_EMERGENCY_CONTACTS = 3` corresponde al requisito que permite registrar hasta tres contactos de emergencia.

### EmergencyContact

Representa un contacto de emergencia con:

- identificador;
- nombre;
- teléfono;
- relación con el residente.

### Unit

Representa una unidad residencial.

Incluye:

- identificador;
- código de unidad;
- estado activo/inactivo;
- ubicación estructurada opcional por torre, pabellón, manzana/bloque y piso.

La estructura de ubicación prepara el dominio para la segmentación de avisos y alertas descrita en los requisitos del caso.

## Relación conceptual

```text
User
  |
  | 1:1 lógico para un residente
  v
Resident
  |
  | pertenece a
  v
Unit

Resident
  |
  | 0..3
  v
EmergencyContact
```

## Requisitos relacionados

Este modelo prepara principalmente:

- RF-USR-03 — roles diferenciados;
- RF-USR-04 — hasta tres contactos de emergencia;
- RF-USR-05 — asociación de residente y unidad + alta/baja;
- RF-USR-07 — registro de último inicio de sesión como dato disponible del usuario.

También prepara parcialmente estructuras necesarias para RF-COM-07 y RF-ALT-04 mediante la localización de la unidad.

## Fuera de alcance en esta fase

Todavía no se implementan:

- registro;
- login;
- Google Sign-In;
- recuperación de contraseña;
- biometría;
- persistencia;
- integración con la API;
- validación administrativa del registro;
- UI;
- casos de uso;
- repositorios.

## Cambios locales observados el 2026-09-08

La copia de trabajo incorpora una clase `Resident` que valida el máximo de contactos al construirse, copia el arreglo y congela la colección. Tres pruebas comprueban aceptación de tres contactos, rechazo del cuarto y aislamiento respecto del arreglo recibido. Esto no congela profundamente cada objeto de contacto ni valida una API; los cambios todavía están sin integrar. Ver [estado actual](06-current-status.md).

## Regla arquitectónica

Las entidades de `apps/mobile/src/domain/entities` no dependen de Expo, React Native, NestJS, Prisma, PostgreSQL, Firebase ni de componentes visuales.
