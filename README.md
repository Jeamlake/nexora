# Nexora

**Tu comunidad, conectada.**

Plataforma móvil de gestión y convivencia residencial para conectar residentes, administración y seguridad. Proyecto del curso **Desarrollo de Aplicaciones Móviles**, organizado en cuatro entregables acumulativos.

Nexora busca centralizar procesos dispersos entre mensajería, llamadas y registros manuales: avisos, encuestas, visitantes con QR, incidencias y alertas comunitarias. La identidad parte de un caso académico.

## Estado

Al **2026-09-08**, el monorepositorio contiene la base móvil y una base operativa de NestJS en `apps/api`. La API valida su entorno, usa el prefijo `/api/v1`, publica un health check y un contrato OpenAPI. PostgreSQL, autenticación y el flujo móvil de perfil siguen pendientes, por lo que el primer entregable aún no está completo.

La comprobación agregada ejecuta lint, formato, tipos, seis pruebas unitarias, tres pruebas HTTP de API, compilación y Expo Doctor. Todo ese conjunto pasa; Expo Doctor completa **21/21** comprobaciones. Consultar [estado y validaciones](docs/06-current-status.md) para el alcance exacto.

## Documentación en español

Empezar por [el índice de documentación](docs/README.md).

- [Qué es Nexora](docs/01-project-overview.md).
- [Por qué elegimos cada tecnología y esta arquitectura](docs/14-decision-rationale.md).
- [Tecnologías, versiones y herramientas heredadas](docs/02-tech-stack.md).
- [Arquitectura y límites de cada aplicación](docs/03-architecture.md).
- [Instalación del proyecto](docs/05-installation-and-setup.md).
- [Cuatro entregables del curso](docs/12-academic-advances.md).
- [Pasos del primer entregable](docs/11-first-advance-plan.md).
- [Organización del equipo](docs/13-team-coordination.md).
- [Decisiones y dependencias pendientes](docs/15-pending-decisions.md).

## Organización

~~~text
apps/
├── mobile/    Aplicación Expo y dominio móvil inicial
└── api/       Base HTTP de NestJS; negocio y persistencia pendientes
packages/      Reservado para código con varios consumidores reales
docs/          Producto, requisitos, arquitectura, decisiones y entregables
~~~

Se usa npm workspaces y un único lockfile. Cada aplicación conserva configuración, dependencias y compilación propias. La raíz reúne instalación y comprobaciones. [ADR-006](docs/adr/ADR-006-monorepo.md).

## Tecnologías y propósito

| Área | Elección | Propósito |
| --- | --- | --- |
| Móvil | React Native, Expo, React y Expo Router | Interfaz y capacidades Android/iOS |
| Lenguaje | TypeScript | Contratos y detección temprana de errores |
| Servidor | NestJS como monolito modular | API, permisos y reglas de negocio |
| Datos previstos | PostgreSQL y Prisma | Relaciones, transacciones y migraciones |
| Comunicación prevista | REST/OpenAPI, WebSockets y FCM | Contratos, eventos y notificaciones |
| Archivos previstos | Almacenamiento de objetos | Fotografías; proveedor pendiente |

Firebase como backend completo fue reemplazado por la arquitectura propia antes de integrarse. Se conserva como opción especializada para notificaciones. Las razones, alternativas y costos están en [fundamentos](docs/14-decision-rationale.md); el [inventario](docs/02-tech-stack.md) distingue instalado, aceptado y pendiente.

## Ejecución

Usar las versiones de Node/npm indicadas en [la guía de instalación](docs/05-installation-and-setup.md).

Desde la raíz:

~~~shell
npm ci
npm run check
npm start
~~~

Para ejecutar la API en otra terminal:

~~~shell
npm run api:start:dev
~~~

Guías específicas: [móvil](apps/mobile/README.md) y [API](apps/api/README.md).

## Colaboración y datos de configuración

`main` representa el estado estable. Las tareas se realizan mediante ramas, revisión y Pull Requests, según [CONTRIBUTING](CONTRIBUTING.md).

Las variables `EXPO_PUBLIC_*` son visibles en el cliente. Los archivos `.env` reales, credenciales y claves privadas no se versionan.

El [LICENSE](LICENSE) fue heredado de Expo. La licencia del código original de Nexora sigue pendiente de decisión del equipo.
