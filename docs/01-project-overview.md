# 01. Descripción general del proyecto

## Nombre del producto

**Nexora**

## Descriptor

**Plataforma móvil de gestión y convivencia residencial**

## Slogan

**Tu comunidad, conectada.**

## Contexto

El caso académico plantea que la gestión de edificios y urbanizaciones cerradas puede concentrarse en grupos de mensajería caóticos, dificultando la comunicación comunitaria y la coordinación de procesos residenciales.

Nexora toma ese escenario como punto de partida para centralizar comunicación oficial, participación, visitantes, incidencias y respuesta temprana ante emergencias.

## Origen de la propuesta

Durante el análisis del caso se identificó como problema articulador la **fragmentación de la gestión residencial**.

A partir de esta situación se plantea Nexora: una aplicación que busca reunir en un único entorno digital los principales procesos de convivencia y coordinación de una comunidad residencial.

La narrativa completa de producto se encuentra en [00-product-identity.md](00-product-identity.md).

## Problema central

> En el contexto planteado, la gestión residencial requiere un canal digital centralizado que integre comunicación oficial, participación, gestión de visitantes, incidencias y respuesta temprana ante emergencias.

## Objetivo general

Diseñar y desarrollar una aplicación móvil multiplataforma que centralice procesos de gestión y convivencia residencial, conectando a residentes, administración/directiva y seguridad mediante flujos estructurados de comunicación, acceso, incidencias y alertas.

## Actores principales

### Administración / Directiva

Administra residentes, unidades, avisos, encuestas e incidencias.

### Residente

Usuario asociado a una unidad. Puede recibir información, participar, generar pases de visita, reportar incidencias y activar alertas.

### Guardia de Seguridad

Valida accesos mediante QR y participa en la atención de eventos de seguridad y emergencia.

## Módulos previstos

### Usuarios y acceso

- autenticación mediante correo/celular y contraseña o cuenta de Google;
- recuperación de contraseña;
- roles diferenciados;
- validación y asociación residente/unidad;
- hasta tres contactos de emergencia por residente;
- activación/desactivación de residentes;
- autenticación biométrica;
- registro de hora de inicio de sesión.

### Avisos y encuestas

- avisos con título, descripción, imagen y vigencia;
- categorías;
- segmentación por torre, pabellón o manzana;
- encuestas de opción única o múltiple;
- control de voto;
- historial;
- resultados configurables en tiempo real o al cierre;
- prioridad alta/obligatoria según la definición pendiente del requisito.

### Visitantes

- preautorización con nombre, fecha y hora estimada;
- QR único asociado a cada invitación;
- compartir pase mediante aplicaciones del dispositivo;
- escaneo con cámara por seguridad;
- invalidación después del primer uso válido;
- registro de entrada y salida;
- cancelación previa al uso;
- notificación al residente.

### Alerta comunitaria

Tipos iniciales:

- médica;
- incendio;
- seguridad.

Flujo previsto:

- botón accesible desde la pantalla principal;
- vibración y sonido en emisor y receptores;
- captura de geolocalización;
- distribución en tiempo real a vecinos afectados y seguridad/directiva;
- simulación de aviso por correo con ubicación a contactos de emergencia;
- respuestas de atención;
- historial con fecha, tipo, unidad y estado de resolución.

### Incidencias

- fotografía;
- descripción;
- ubicación dentro del condominio;
- estados Pendiente / En atención / Resuelto;
- seguimiento y notificación al reportante;
- gráfico mensual para administradores.

## Requisitos no funcionales destacados

El caso establece, entre otros objetivos de calidad:

- llegada promedio de la alerta en aproximadamente 3 segundos;
- disponibilidad mínima del 99 % para el módulo de alertas;
- QR temporales e impredecibles;
- escalabilidad hasta 500 unidades residenciales concurrentes;
- cifrado de datos sensibles en tránsito y en reposo;
- arquitectura por capas;
- accesibilidad orientada también a adultos mayores.

La especificación completa, incluyendo ambigüedades que deben resolverse antes de implementar, se mantiene en [08-requirements.md](08-requirements.md).

## Alcance actual

Solo está implementado el **baseline técnico**:

- React Native;
- Expo;
- TypeScript;
- Expo Router;
- Android Emulator;
- Git/GitHub;
- identidad Nexora;
- documentación inicial.

Las funcionalidades de negocio todavía no están implementadas.

## Fecha del baseline

2026-08-26
