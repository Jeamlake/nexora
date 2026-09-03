# 12. Avances académicos

## Propósito

Este documento divide la construcción completa de Nexora en cuatro avances acumulativos. Define alcance, decisiones previas, demostración y condición de aceptación para evitar que cada integrante interprete entregables diferentes.

El roadmap técnico de [07-roadmap.md](07-roadmap.md) describe fases de ingeniería. Este documento agrupa esas fases en los cuatro cortes académicos del proyecto.

## Reglas comunes

Cada avance debe:

- partir de `main` estable y trabajar mediante ramas y Pull Requests;
- mantener móvil y API integrados para los flujos incluidos;
- incluir migraciones y datos de demostración cuando cambie la persistencia;
- agregar pruebas proporcionales al riesgo;
- actualizar requisitos, ADR, arquitectura, instalación y changelog afectados;
- poder instalarse desde cero con `npm ci` desde la raíz;
- mantener secretos y datos personales fuera de Git;
- incluir un guion y evidencias reproducibles de demostración;
- distinguir funciones implementadas de arquitectura prevista;
- cerrar sus decisiones bloqueantes antes de programar el módulo relacionado.

Un avance no se considera terminado por tener pantallas aisladas, endpoints sin cliente o datos simulados que eviten la integración acordada.

## Avance 1 — Fundamentos, identidad y perfil

### Objetivo

Probar la arquitectura completa mediante el primer flujo vertical móvil-API-PostgreSQL.

### Alcance

- monorepositorio y workspaces;
- aplicación Expo en `apps/mobile`;
- API NestJS en `apps/api`;
- PostgreSQL, Prisma, migraciones y seed;
- configuración validada, Swagger y `GET /health`;
- CI inicial;
- autenticación, sesiones y cierre de sesión;
- autorización para administrador/directiva, residente y seguridad;
- condominios, unidades, residentes y contactos de emergencia;
- regla de máximo tres contactos;
- cliente HTTP del móvil;
- pantallas de login y perfil;
- visualización de rol, unidad y contactos desde datos reales.

### Decisiones que deben cerrarse

- autenticación propia o proveedor administrado;
- duración, renovación, revocación y almacenamiento de tokens;
- datos obligatorios de usuario, residente y unidad;
- estrategia de ambientes y URLs locales;
- política de cuentas y credenciales seed.

### Demostración mínima

Un colaborador instala el monorepositorio, levanta la base y la API, inicia la app, autentica una cuenta seed, consulta su perfil desde PostgreSQL y cierra sesión.

### Documento operativo

El detalle paso a paso se encuentra en [11-first-advance-plan.md](11-first-advance-plan.md).

## Avance 2 — Comunidad, votaciones y visitantes

### Objetivo

Implementar los flujos cotidianos de comunicación, participación y control de acceso.

### Alcance

- creación, edición, publicación, segmentación y archivo de avisos;
- listado, detalle e historial de avisos;
- creación, publicación, cierre y consulta de encuestas;
- votación transaccional sin duplicados;
- resultados e historial de encuestas;
- creación y cancelación de invitaciones;
- token impredecible y QR temporal de un solo uso;
- compartir invitación;
- escaneo y validación por seguridad;
- registro de entrada y salida;
- historial y permisos según rol;
- pruebas de concurrencia para votos y consumo del pase.

### Decisiones que deben cerrarse

- un voto por unidad o por residente;
- significado y comportamiento de una encuesta obligatoria;
- visibilidad de resultados antes del cierre;
- criterios de segmentación;
- vigencia y cancelación de invitaciones;
- reglas de entrada, salida y reingreso;
- datos personales mínimos del visitante.

### Demostración mínima

Administración publica un aviso y una encuesta; un residente consulta y vota; después crea una invitación y seguridad valida el QR una sola vez y registra la visita.

## Avance 3 — Emergencias, incidencias y capacidades nativas

### Objetivo

Completar los flujos críticos y comprobar su comportamiento en dispositivos reales, primer plano y segundo plano.

### Alcance

- alertas médica, incendio y seguridad;
- activación accesible con prevención de pulsaciones accidentales;
- captura de ubicación;
- persistencia y auditoría de la alerta;
- distribución autorizada por sector;
- eventos WebSocket para clientes conectados;
- FCM para segundo plano o aplicación cerrada;
- sonido, vibración y estados de atención;
- cancelación y resolución según permisos;
- creación de incidencias con categoría, descripción y ubicación;
- captura o selección de fotografías;
- almacenamiento de objetos y metadatos en PostgreSQL;
- asignación, seguimiento, historial y estadísticas básicas;
- Expo Development Build y permisos nativos;
- medición inicial de latencia extremo a extremo.

### Decisiones que deben cerrarse

- gesto o número de pulsaciones para activar una alerta;
- destinatarios por tipo de alerta y sector;
- reglas para cancelar, atender y resolver;
- comportamiento sin ubicación o sin conectividad;
- proveedor y políticas de FCM;
- proveedor de Object Storage, límites y retención;
- permisos móviles y experiencia cuando son rechazados;
- definición exacta del inicio y fin de la medición de tres segundos.

### Demostración mínima

Un residente genera una alerta con ubicación; seguridad y los destinatarios autorizados la reciben, incluso en segundo plano, y seguridad la atiende y resuelve. También se registra y procesa una incidencia con fotografía.

## Avance 4 — Calidad, seguridad y entrega integral

### Objetivo

Convertir el sistema acumulado en una versión candidata a entrega, reproducible, segura, medible y documentada.

### Alcance

- recuperación y cambio de contraseña;
- autenticación con Google si el requisito se mantiene;
- reautenticación o desbloqueo biométrico;
- gestión de sesiones y dispositivos;
- revisión completa de autorización y pertenencia a condominio;
- validación, sanitización y rate limiting;
- logs, métricas y auditoría;
- copias de respaldo y restauración;
- pruebas unitarias, integración, contrato y end-to-end;
- pruebas de carga con un escenario definido para hasta 500 unidades;
- medición final de latencia y disponibilidad;
- accesibilidad verificable;
- corrección de errores y optimización;
- ambientes, CI completo y builds Android reproducibles;
- perfiles EAS y artefacto de demostración;
- manual técnico, manual de usuario y diagramas finales;
- matriz de trazabilidad entre requisitos, implementación y pruebas;
- evidencias, guion y presentación académica.

### Decisiones que deben cerrarse

- permanencia del login con Google y alcance exacto de biometría;
- fórmula, ventana y entorno para medir 99 % de disponibilidad;
- distribución del escenario de 500 unidades concurrentes;
- criterios cuantificables de accesibilidad;
- hosting, dominio, certificados y ambientes;
- retención de logs, auditoría, archivos y respaldos;
- formato final de distribución exigido por el curso.

### Demostración mínima

El equipo instala o despliega una versión limpia, ejecuta los flujos críticos de los tres avances anteriores, presenta resultados de pruebas y entrega un build acompañado de documentación trazable.

## Dependencias entre avances

```text
Avance 1
Base, identidad y primer flujo vertical
        ↓
Avance 2
Operaciones comunitarias y visitantes
        ↓
Avance 3
Emergencias, incidencias y runtime nativo
        ↓
Avance 4
Calidad, seguridad y entrega integral
```

El trabajo exploratorio de un avance posterior puede realizarse antes, pero no debe integrarse si obliga a omitir una condición de aceptación del avance activo.

## Control de alcance

Una modificación del contenido de un avance debe:

1. indicar el requisito afectado;
2. explicar el motivo y el impacto sobre calendario, arquitectura y pruebas;
3. actualizar este documento y el roadmap en el mismo Pull Request;
4. ser comunicada a los cuatro integrantes;
5. evitar trasladar silenciosamente trabajo obligatorio al avance final.

## Estado actual

- **Avance activo:** 1.
- **Paso activo:** reorganización y validación del monorepositorio.
- **Siguiente paso después de integrar:** inicializar NestJS en `apps/api`.
