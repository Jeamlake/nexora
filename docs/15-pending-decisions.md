# 15. Decisiones pendientes y orden de resolución

Revisión: 2026-09-10. Este registro reúne preguntas que afectan la ejecución. No cambia decisiones aceptadas ni asigna nombres, proveedores o fechas sin acuerdo.

## Pendiente académico del primer entregable

| ID | Tema | Por qué importa y evidencia de cierre |
| --- | --- | --- |
| PD-01 | Rúbrica, fechas, formato y evaluación individual | Contrastar el plan interno con el curso y registrar correspondencia con los cuatro avances |

Los diez pasos de ejecución siguen en [el primer avance](11-first-advance-plan.md).

## Decisiones cerradas al implementar el primer entregable

| ID | Resolución | Evidencia |
| --- | --- | --- |
| PD-03 | PostgreSQL 18.6 en Compose y Prisma 6.12 fijado después de auditoría | Esquema, migración, seed, `npm audit` y CI |
| PD-04 | Autenticación propia, JWT corto, refresh opaco rotado/revocado y SecureStore | [ADR-007](adr/ADR-007-autenticacion-y-sesiones.md) y pruebas HTTP |
| PD-05 | Perfil servidor con condominio, unidad, usuario, residente y máximo tres contactos | Migración, endpoint `/profile/me` y prueba de persistencia |

## Decisiones cerradas en la base de API

| ID | Resolución | Evidencia |
| --- | --- | --- |
| PD-02 | Workspace NestJS completado con nombre `@nexora/api`, TypeScript estricto, configuración y rutas base | Compilación, pruebas y [guía de API](../apps/api/README.md) |
| PD-06 | `check` incluye tipos, formato, pruebas HTTP y build de API; GitHub Actions ejecuta instalación limpia y el check agregado | [Estado y validaciones](06-current-status.md) |
| PD-07 | Se conservan Vitest, Oxlint y Prettier en API; Vite resuelve `tsconfig` sin plugin; se retiran Mau y el script de despliegue | Manifiesto de API, configuraciones y [fundamentos](14-decision-rationale.md) |

## Antes de implementar comunidad y visitantes

| ID | Tema | Resolución necesaria |
| --- | --- | --- |
| PD-08 | Voto y encuesta obligatoria | Cerrar DP-01/DP-02 de [requisitos](08-requirements.md), resultados, segmentación y concurrencia |
| PD-09 | Visitas y QR | Acordar vigencia, cancelación, salida/reingreso, datos mínimos y consumo atómico |
| PD-10 | Imágenes de avisos del avance 2 | RF-COM-01 exige imagen, pero almacenamiento está detallado en avance 3; definir cuándo se habilita esa dependencia |
| PD-11 | Cámara del avance 2 | Verificar QR y permisos en un dispositivo; la compilación propia dependerá de las bibliotecas elegidas |

PD-10 y PD-11 son dependencias detectadas en esta revisión. El ajuste debe reflejarse en el plan antes de ejecutar el módulo; no se eliminan requisitos para mantener un reparto artificial.

## Antes de implementar y aceptar alertas

| ID | Tema | Resolución necesaria |
| --- | --- | --- |
| PD-12 | Activación y destinatarios | Cerrar DP-03; definir sector, estados, cancelación, atención y resolución |
| PD-13 | WebSockets y push | Elegir adaptador e integración FCM/APNs o intermediario, permisos, reconexión, duplicados y falta de red |
| PD-14 | Tres segundos y 99 % | Definir inicio/fin, dispositivos, condiciones y ventana; conservar mediciones reales |
| PD-15 | Fotografías e incidencias | Elegir proveedor, autorización, límites, retención, estados y notificaciones |
| PD-16 | Correo de emergencia | Incorporar al guion la simulación RF-ALT-05 / DP-06, sin convertirla automáticamente en correo real |

## Antes de la entrega integral

| ID | Tema | Resolución necesaria |
| --- | --- | --- |
| PD-17 | Google, biometría y recuperación | Conservar trazabilidad de RF-USR-02/06; cualquier reducción requiere acuerdo académico explícito |
| PD-18 | Carga y accesibilidad | Definir 500 unidades concurrentes y criterios medibles para adultos mayores; probarlos |
| PD-19 | Operación y distribución | Elegir hosting, ambientes, respaldos, logs, certificados, perfiles y artefacto exigido |
| PD-20 | Licencia de Nexora | `LICENSE` heredado y `UNLICENSED` de la plantilla API no son una decisión de licencia del equipo |
| PD-21 | Equipo y evidencia | Asignar responsables/revisores reales, rotar conocimiento y reunir manuales, pruebas y presentación |

## Cómo cerrar una decisión

Registrar requisito, opciones, elección, razón, costo y evidencia. Actualizar el documento dueño del tema y enlazar ADR o PR. Usar **pendiente**, **en evaluación**, **decidida** e **implementada/verificada**; redactar una explicación no equivale a implementar.

Las ambigüedades del enunciado permanecen en [requisitos](08-requirements.md), sin renumerar sus DP. Las responsabilidades permanecen en [coordinación](13-team-coordination.md).
