# Documentación técnica

La documentación de **Condominio Alerta Comunitaria** sigue el enfoque **docs as code**: vive junto al código, se versiona con Git y evoluciona mediante commits y Pull Requests.

## Índice

| Documento | Contenido |
| --- | --- |
| [01-project-overview.md](01-project-overview.md) | Problema, alcance y módulos |
| [02-tech-stack.md](02-tech-stack.md) | Tecnologías, versiones y razones |
| [03-architecture.md](03-architecture.md) | Arquitectura objetivo |
| [04-development-environment.md](04-development-environment.md) | Entorno técnico |
| [05-installation-and-setup.md](05-installation-and-setup.md) | Preparación de otra computadora |
| [06-current-status.md](06-current-status.md) | Estado real |
| [07-roadmap.md](07-roadmap.md) | Próximas fases |

## Architecture Decision Records

- [ADR-001: React Native con Expo](adr/ADR-001-react-native-expo.md)
- [ADR-002: TypeScript](adr/ADR-002-typescript.md)
- [ADR-003: Firebase](adr/ADR-003-firebase.md)
- [ADR-004: Arquitectura por capas](adr/ADR-004-layered-architecture.md)

## Regla de mantenimiento

Si un cambio modifica arquitectura, dependencias importantes, configuración, instalación, Firebase o deployment, la documentación relacionada debe actualizarse en el mismo Pull Request.
