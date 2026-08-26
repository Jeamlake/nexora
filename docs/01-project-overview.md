# 01. Descripción general del proyecto

## Nombre

**Condominio Alerta Comunitaria**

## Tipo de solución

Aplicación móvil multiplataforma para administración y comunicación de condominios.

## Problema

Las operaciones de un condominio suelen encontrarse fragmentadas entre mensajería instantánea, llamadas, documentos físicos y comunicaciones informales.

El proyecto busca centralizar comunicación, control de accesos, incidencias y alertas dentro de una sola aplicación.

## Actores

### Administración / Directiva

Administra residentes, publica avisos, crea encuestas y supervisa incidencias y eventos.

### Residente

Usuario asociado a una unidad. Puede recibir información, votar, generar pases, reportar incidencias y activar alertas.

### Guardia / Seguridad

Valida accesos mediante QR y participa en la atención de alertas.

## Módulos previstos

### Usuarios y acceso

- autenticación;
- recuperación de contraseña;
- roles;
- asociación residente/unidad;
- contactos de emergencia;
- activación/desactivación;
- biometría;
- registro de acceso.

### Avisos y encuestas

- avisos;
- imágenes;
- vigencia;
- categorías;
- segmentación;
- encuestas simples o múltiples;
- historial;
- resultados.

### Visitantes

- preautorización;
- nombre, fecha y horario;
- QR único;
- compartir invitación;
- escaneo;
- control de primer uso;
- entrada/salida;
- cancelación;
- notificación al residente.

### Alerta comunitaria

Tipos iniciales:

- emergencia médica;
- incendio;
- seguridad.

Flujo previsto:

- activación rápida;
- vibración y sonido;
- geolocalización;
- distribución en tiempo real;
- avisos a vecinos y seguridad;
- contactos de emergencia;
- estados de atención;
- historial.

### Incidencias

- fotografía;
- descripción;
- ubicación;
- estado;
- seguimiento;
- notificación;
- estadísticas.

## Requisitos no funcionales relevantes

- baja latencia en emergencias;
- disponibilidad;
- QR impredecibles y temporales;
- experiencia simple en situaciones críticas;
- crecimiento hasta cientos de unidades;
- cifrado en tránsito y almacenamiento;
- separación por capas;
- accesibilidad.

## Alcance actual

Solo está implementado el **baseline técnico**:

- React Native;
- Expo;
- TypeScript;
- Expo Router;
- Android Emulator;
- Git/GitHub;
- documentación inicial.

Las funcionalidades de negocio todavía no están implementadas.

## Fecha del baseline

2026-08-26
