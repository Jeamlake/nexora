# 08. Requisitos del caso y trazabilidad inicial

## Propósito

Este documento convierte el enunciado académico del caso **Gestión de Condominios y Alerta Comunitaria** en una especificación trazable para Nexora.

Los identificadores internos de Nexora evitan depender de la numeración original, que contiene una duplicación del número 15 y omite el número 23.

**Estado actual de todos los requisitos funcionales:** pendiente de implementación.

## Convenciones

- **RF**: requisito funcional.
- **RNF**: requisito no funcional.
- **Referencia original**: número utilizado en el documento del caso.
- **Pendiente de decisión**: el enunciado original presenta una ambigüedad o necesita criterios de aceptación antes de programarse.

---

## Gestión de usuarios y accesos

| ID | Ref. original | Requisito |
| --- | ---: | --- |
| RF-USR-01 | 1 | Permitir registro de residentes con validación de la unidad/departamento asignado por el administrador. |
| RF-USR-02 | 2 | Permitir inicio de sesión mediante correo/celular y contraseña o cuenta de Google, incluyendo recuperación de contraseña. |
| RF-USR-03 | 3 | Manejar tres roles diferenciados: Administrador/Directiva, Residente y Guardia de Seguridad. |
| RF-USR-04 | 4 | Permitir al residente registrar hasta tres contactos de emergencia con nombre, teléfono y relación. |
| RF-USR-05 | 5 | Permitir a la directiva dar de alta/baja a un residente y asociarlo a una unidad habitacional. |
| RF-USR-06 | 6 | Permitir autenticación biométrica como método alternativo de inicio de sesión. |
| RF-USR-07 | 7 | Registrar la hora de inicio de sesión. |

## Avisos y encuestas

| ID | Ref. original | Requisito |
| --- | ---: | --- |
| RF-COM-01 | 8 | Permitir a la directiva publicar avisos con título, descripción, imagen y fecha de vigencia. |
| RF-COM-02 | 9 | Permitir crear encuestas con preguntas de opción única o múltiple. |
| RF-COM-03 | 10 | Restringir la emisión de votos según la regla definitiva de participación. **Pendiente de decisión: el enunciado indica a la vez “un voto por unidad” y “un voto por residente”.** |
| RF-COM-04 | 11 | Permitir filtrar avisos por categoría, por ejemplo mantenimiento, seguridad, eventos o pagos. |
| RF-COM-05 | 12 | Mantener historial consultable de avisos y encuestas anteriores. |
| RF-COM-06 | 13 | Mostrar resultados de encuestas en tiempo real o al cierre según configuración de la directiva. |
| RF-COM-07 | 14 | Segmentar avisos y encuestas por torre, pabellón o manzana. |
| RF-COM-08 | 15 | Marcar encuestas de prioridad alta como obligatorias. **Pendiente de definir qué comportamiento implica “obligatoria”.** |

## Preautorización de visitas

> El documento original vuelve a utilizar el número 15 al iniciar este módulo.

| ID | Ref. original | Requisito |
| --- | ---: | --- |
| RF-VIS-01 | 15 (duplicado) | Permitir al residente generar una invitación indicando nombre del invitado, fecha y hora estimada de llegada. |
| RF-VIS-02 | 16 | Generar automáticamente un código QR único asociado a cada invitación. |
| RF-VIS-03 | 17 | Permitir compartir el pase (imagen/QR) mediante WhatsApp, correo u otras aplicaciones del dispositivo. |
| RF-VIS-04 | 18 | Permitir al guardia escanear el QR mediante la cámara para validar el ingreso. |
| RF-VIS-05 | 19 | Marcar el QR como usado después de su primer escaneo válido e impedir reutilizaciones. |
| RF-VIS-06 | 20 | Registrar la hora exacta de ingreso y salida de cada visita autorizada. |
| RF-VIS-07 | 21 | Notificar al residente cuando su visita ingrese al condominio mediante un flujo orientado a eventos. |
| RF-VIS-08 | 22 | Permitir cancelar/anular un pase antes de su uso. |

## Alerta temprana

> La numeración original salta del requisito 22 al 24.

| ID | Ref. original | Requisito |
| --- | ---: | --- |
| RF-ALT-01 | 24 | Mostrar desde la pantalla principal un botón de pánico con categorías Médica, Incendio y Seguridad. |
| RF-ALT-02 | 25 | Activar vibración y sonido de alerta en el emisor y en los receptores. |
| RF-ALT-03 | 26 | Capturar automáticamente la geolocalización del residente al activar la alerta. |
| RF-ALT-04 | 27 | Notificar en tiempo real a vecinos del mismo pabellón/manzana y a directiva/seguridad. |
| RF-ALT-05 | 28 | Simular el envío de un correo con la ubicación a los contactos de emergencia registrados. |
| RF-ALT-06 | 29 | Permitir a un vecino marcar “estoy en camino” o “alerta atendida” sobre una alerta activa. |
| RF-ALT-07 | 30 | Mantener historial de alertas con fecha, tipo, unidad de origen y estado de resolución. |

## Reporte de incidencias

| ID | Ref. original | Requisito |
| --- | ---: | --- |
| RF-INC-01 | 31 | Permitir reportar una incidencia con foto, descripción y ubicación dentro del condominio. |
| RF-INC-02 | 32 | Permitir a directiva/mantenimiento actualizar el estado a Pendiente, En atención o Resuelto y notificar al reportante. |
| RF-INC-03 | 33 | Permitir a administradores visualizar la cantidad mensual de incidencias mediante un gráfico. |

---

## Requisitos no funcionales

| ID | Ref. original | Categoría | Requisito |
| --- | ---: | --- | --- |
| RNF-01 | 1 | Rendimiento / tiempo real | La notificación del botón de pánico debe llegar a los dispositivos afectados en un tiempo promedio de 3 segundos mediante arquitectura orientada a eventos. |
| RNF-02 | 2 | Disponibilidad | El módulo de alertas debe tener una disponibilidad mínima del 99 %. **Pendiente de definir período y método de medición.** |
| RNF-03 | 3 | Seguridad QR | Los QR deben expirar pasado el día de la visita y no ser predecibles. El caso menciona UUID v4 como ejemplo; la implementación concreta debe validarse. |
| RNF-04 | 4 | Usabilidad | El botón de pánico debe poder operarse con muy pocos toques desde cualquier pantalla. **El documento original omite el número exacto en la frase “menos de ... toques”; debe aclararse antes de fijar un criterio de aceptación.** |
| RNF-05 | 5 | Escalabilidad | El sistema debe soportar hasta 500 unidades residenciales concurrentes sin degradación perceptible del tiempo de respuesta. |
| RNF-06 | 6 | Seguridad de datos | Los datos sensibles deben cifrarse en tránsito y en reposo. |
| RNF-07 | 7 | Mantenibilidad | El sistema debe utilizar arquitectura en capas: presentación, lógica de negocio y acceso a datos. |
| RNF-08 | 8 | Accesibilidad | La interfaz debe considerar tamaños y funcionalidades simplificadas para facilitar el uso por adultos mayores. **Pendiente de definir criterios medibles de accesibilidad.** |

---

## Decisiones pendientes antes de implementar

### DP-01 — Regla de voto

Resolver si la restricción será:

- un voto por unidad residencial; o
- un voto por residente.

No debe implementarse hasta elegir una regla única.

### DP-02 — Significado de encuesta obligatoria

Definir si una encuesta de prioridad alta:

- bloquea otras acciones hasta responderse;
- solo muestra una alerta persistente;
- exige confirmación de lectura;
- o utiliza otro comportamiento.

### DP-03 — Umbral de toques del botón de pánico

El requisito original no contiene el número después de “menos de”. Se debe acordar un máximo verificable antes de convertirlo en prueba de aceptación.

### DP-04 — Medición del 99 % de disponibilidad

Definir:

- período de medición;
- qué componentes pertenecen al módulo crítico;
- cómo se contabiliza mantenimiento programado;
- mecanismo de observación.

### DP-05 — Accesibilidad

Convertir “tamaño definido” y “funcionalidades limitadas” en criterios verificables de tamaño táctil, tipografía, contraste y navegación.

### DP-06 — Simulación de correo de emergencia

El caso solicita **simular** el envío de correo con ubicación. No debe convertirse automáticamente en una integración real de correo sin una decisión posterior del equipo/profesor.

---

## Estado de implementación

A fecha de 2026-08-26, estos requisitos están documentados pero **las funcionalidades de negocio todavía no están implementadas**.

A medida que avance el desarrollo, cada requisito deberá relacionarse con:

- casos de uso;
- módulos/archivos;
- pruebas;
- evidencia de cumplimiento.

Ese vínculo formará la matriz de trazabilidad de requisitos.
