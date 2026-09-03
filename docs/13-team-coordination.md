# 13. Coordinación del equipo

## Objetivo

Organizar el trabajo de cuatro colaboradores sin duplicar esfuerzos, bloquear integraciones ni depender de acuerdos que solo existan en conversaciones.

## Modelo de trabajo

Los cuatro frentes son responsabilidades de trabajo, no cargos permanentes:

1. **Producto, plataforma y documentación:** alcance, requisitos, ADR, raíz del monorepo y CI.
2. **API y seguridad:** NestJS, contratos, autenticación y autorización.
3. **Datos y dominio servidor:** PostgreSQL, Prisma, migraciones, restricciones y seed.
4. **Móvil e integración:** Expo, experiencia, cliente HTTP, sesión y pantallas.

Cada tarea tiene una persona responsable y otra revisora. La persona que implementa no debe ser la única que valide su cambio. Las responsabilidades pueden rotar según experiencia, disponibilidad y carga.

## Variables para asignar una tarea

Antes de comenzar debe conocerse:

- avance y requisito relacionado;
- resultado observable esperado;
- prioridad y fecha límite;
- dependencias técnicas y decisiones pendientes;
- workspace y archivos probables;
- persona responsable y revisora;
- experiencia necesaria;
- disponibilidad real;
- sistema operativo, dispositivo o servicio requerido;
- cambios de base de datos o contrato HTTP;
- riesgos de seguridad y datos personales;
- pruebas necesarias;
- documentación y evidencia esperadas;
- condición exacta de terminado.

Si falta una variable que cambia materialmente la solución, la tarea permanece en preparación. No se resuelve mediante una suposición silenciosa.

## Estados de trabajo

```text
Preparación
    ↓
Lista
    ↓
En desarrollo
    ↓
En revisión
    ↓
Validación integrada
    ↓
Terminada
```

- **Preparación:** faltan decisiones o aceptación.
- **Lista:** puede comenzar sin bloqueo conocido.
- **En desarrollo:** tiene responsable y rama.
- **En revisión:** existe Pull Request verificable.
- **Validación integrada:** funciona con los componentes afectados.
- **Terminada:** está fusionada en `main`, documentada y demostrable.

## Contrato mínimo de una tarea

Toda tarea debe registrar:

```text
Título:
Avance:
Requisito(s):
Responsable:
Revisor(a):
Dependencias:
Alcance incluido:
Fuera de alcance:
Criterios de aceptación:
Pruebas:
Documentación:
Riesgos o decisiones:
```

La herramienta de seguimiento podrá cambiar, pero estos campos no deben perderse. GitHub Issues es suficiente para el tamaño actual del equipo.

## Ramas y Pull Requests

- una rama por objetivo verificable;
- nombres basados en el resultado, por ejemplo `feature/authentication` o `chore/monorepo-transition`;
- no usar nombres de asistentes, herramientas ni la palabra `plan` como prefijo o propósito de una rama;
- no programar directamente en `main`;
- sincronizar con `main` antes de abrir el Pull Request;
- mantener Pull Requests pequeños cuando no rompan un flujo vertical;
- incluir cambios coordinados de móvil y API en el mismo Pull Request cuando forman un único contrato;
- pedir revisión a alguien distinto de quien implementó;
- corregir documentación y pruebas dentro del mismo Pull Request.

La plantilla oficial se encuentra en `.github/pull_request_template.md`.

## Coordinación de contratos

Cuando una tarea cambie la comunicación móvil-API:

1. definir primero comportamiento, autorización, entrada, salida y errores;
2. actualizar OpenAPI;
3. implementar y probar la API;
4. actualizar el adaptador y mapper del móvil;
5. probar el flujo integrado;
6. evitar que DTO, Prisma o respuestas HTTP entren directamente al Domain móvil.

## Coordinación de base de datos

- una migración debe representar un cambio revisable;
- no editar una migración ya aplicada por otros colaboradores;
- proporcionar seed o fixture cuando una demostración dependa de datos;
- documentar cualquier operación destructiva o incompatible;
- las restricciones críticas deben existir en API y, cuando corresponda, también en PostgreSQL.

## Reparto recomendado para el primer avance

| Frente | Trabajo inicial | Integración principal |
| --- | --- | --- |
| Producto/plataforma | Monorepo, scripts, CI y documentación | Validación raíz y entrega |
| API/seguridad | Baseline NestJS, configuración y ADR de autenticación | Endpoints y autorización |
| Datos/dominio | PostgreSQL, Prisma, migraciones y seed | Perfil residente-unidad |
| Móvil/integración | Cliente HTTP, sesión, login y perfil | Flujo móvil completo |

Este reparto se ajusta según la disponibilidad del equipo. No permite comenzar cuatro soluciones incompatibles: cada frente respeta el orden del [primer avance](11-first-advance-plan.md).

## Ritmo mínimo de coordinación

- al iniciar: confirmar tarea, responsable, revisor y dependencias;
- durante: comunicar inmediatamente un cambio de contrato o bloqueo;
- antes de revisar: actualizar la rama y ejecutar validaciones;
- al cerrar: registrar resultado, pruebas, decisiones y trabajo pendiente;
- al terminar cada avance: etiquetar el commit estable únicamente después de la aceptación.

## Definición de terminado del equipo

Una tarea está terminada cuando:

- cumple sus criterios de aceptación;
- incluye pruebas y documentación necesarias;
- no introduce secretos ni datos personales;
- fue revisada por otra persona;
- pasó la validación del workspace afectado y de la raíz;
- se integró en `main`;
- puede ser explicada y demostrada por más de un integrante.
