# 07. Roadmap técnico

## Principios

- entregar cortes pequeños y verificables;
- mantener `main` estable;
- no presentar arquitectura prevista como implementada;
- centralizar reglas definitivas en la API;
- agregar infraestructura solo cuando exista una necesidad medida;
- mantener instrucciones reproducibles para todos los colaboradores.

## Fase 0 — Baseline móvil

**Estado: completado**

- entorno Expo SDK 57;
- React Native, TypeScript y Expo Router;
- Android Emulator y Expo Go;
- Git/GitHub;
- documentación inicial.

## Fase 1 — Arquitectura móvil y Domain Core

**Estado: implementado en rama; integración a `main` pendiente**

- estructura Presentation, Domain y Data;
- entidades de usuario, residente, unidad y contacto;
- regla de máximo tres contactos;
- documentación del dominio.

## Fase 2 — Transición al backend propio

**Estado: en revisión**

- ADR-003 marcado como reemplazado;
- ADR-005 para NestJS y PostgreSQL;
- arquitectura y stack actualizados;
- guía multiplataforma para colaboradores;
- configuración pública de la futura API;
- parches compatibles de Expo SDK 57 alineados y validados;
- revisión y merge de `feature/domain-core` mediante Pull Request pendientes.

## Fase 3 — Baseline de `nexora-api`

**Estado: pendiente**

- crear repositorio;
- NestJS y TypeScript estricto;
- monolito modular;
- PostgreSQL mediante Docker Compose;
- Prisma y migraciones;
- variables validadas;
- Swagger/OpenAPI;
- endpoint de salud;
- pruebas básicas;
- CI;
- guía de instalación multiplataforma.

## Fase 4 — Identidad, usuarios y residencia

- ADR de autenticación;
- identidad y sesiones;
- roles y autorización;
- condominios y unidades;
- residentes y contactos de emergencia;
- primer corte vertical móvil-API;
- pruebas de contrato e integración.

## Fase 5 — Comunicación comunitaria

- avisos;
- categorías y segmentación;
- encuestas;
- regla de voto aprobada;
- historial y resultados.

## Fase 6 — Visitantes

- invitaciones;
- tokens impredecibles;
- QR temporal de un solo uso;
- compartir y escanear;
- registro de entrada/salida;
- cancelación y notificación.

## Fase 7 — Alertas

- categorías de emergencia;
- flujo accesible del botón de pánico;
- geolocalización;
- persistencia y auditoría;
- eventos WebSocket;
- FCM;
- atención y resolución;
- mediciones de latencia y disponibilidad.

## Fase 8 — Incidencias y archivos

- fotografías mediante Object Storage;
- descripción y ubicación;
- estados e historial;
- notificaciones;
- estadísticas administrativas.

## Fase 9 — Runtime nativo y distribución interna

- Expo Development Build;
- permisos y configuración nativa;
- biometría;
- notificaciones en dispositivos reales;
- perfiles EAS;
- build compartido para colaboradores.

## Fase 10 — Calidad y seguridad

- pruebas unitarias, de integración y end-to-end;
- pruebas de carga;
- rate limiting;
- logs, métricas y trazas;
- copias de respaldo y restauración;
- accesibilidad medible;
- revisión de amenazas y secretos.

## Fase 11 — Entrega académica

- matriz de trazabilidad;
- evidencia de requisitos;
- diagramas actualizados;
- builds de demostración;
- manual técnico y de usuario;
- presentación final.

El detalle operativo de las fases 2 a 4 se encuentra en [10-backend-transition.md](10-backend-transition.md).
