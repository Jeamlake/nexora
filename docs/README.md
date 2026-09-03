# Documentación técnica de Nexora

La documentación de **Nexora** sigue el enfoque **docs as code**: vive junto al código, se versiona con Git y evoluciona mediante commits y Pull Requests.

## Índice

| Documento | Contenido |
| --- | --- |
| [00-product-identity.md](00-product-identity.md) | Identidad, historia, propuesta de valor, misión y visión |
| [01-project-overview.md](01-project-overview.md) | Problema, alcance y módulos |
| [02-tech-stack.md](02-tech-stack.md) | Tecnologías, versiones y razones |
| [03-architecture.md](03-architecture.md) | Arquitectura objetivo |
| [04-development-environment.md](04-development-environment.md) | Entorno técnico |
| [05-installation-and-setup.md](05-installation-and-setup.md) | Preparación de otra computadora |
| [06-current-status.md](06-current-status.md) | Estado real |
| [07-roadmap.md](07-roadmap.md) | Próximas fases |
| [08-requirements.md](08-requirements.md) | Requisitos funcionales/no funcionales, trazabilidad y decisiones pendientes |
| [09-domain-model.md](09-domain-model.md) | Primer modelo de dominio implementado |
| [10-backend-transition.md](10-backend-transition.md) | Entregables y secuencia de transición a `nexora-api` |
| [11-first-advance-plan.md](11-first-advance-plan.md) | Pasos, evidencias y definición de terminado del primer avance |

## Architecture Decision Records

- [ADR-001: React Native con Expo](adr/ADR-001-react-native-expo.md)
- [ADR-002: TypeScript](adr/ADR-002-typescript.md)
- [ADR-003: Firebase (reemplazado)](adr/ADR-003-firebase.md)
- [ADR-004: Arquitectura por capas](adr/ADR-004-layered-architecture.md)
- [ADR-005: NestJS y PostgreSQL](adr/ADR-005-nestjs-postgresql.md)

## Regla de mantenimiento

Si un cambio modifica la identidad del producto, requisitos, arquitectura, contrato de API, dependencias importantes, configuración, instalación o despliegue, la documentación relacionada debe actualizarse en el mismo Pull Request.
