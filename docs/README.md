# Documentación de Nexora

Nexora es el proyecto del curso **Desarrollo de Aplicaciones Móviles**, organizado en cuatro entregables acumulativos. La documentación del proyecto se redacta en **español** y se versiona junto al código.

## Por dónde empezar

1. **Qué construimos:** [descripción del proyecto](01-project-overview.md).
2. **Por qué estas tecnologías y esta organización:** [fundamentos de las decisiones](14-decision-rationale.md).
3. **Qué existe realmente:** [estado actual](06-current-status.md) y [tecnologías](02-tech-stack.md).
4. **Cómo se entregará:** [cuatro avances](12-academic-advances.md), [primer avance](11-first-advance-plan.md) y [decisiones pendientes](15-pending-decisions.md).
5. **Cómo ejecutarlo:** [demostración del entregable 1](16-demostracion-entregable-1.md), [instalación](05-installation-and-setup.md) y [CONTRIBUTING](../CONTRIBUTING.md).

## Producto y requisitos

| Documento | Responsabilidad |
| --- | --- |
| [00. Identidad](00-product-identity.md) | Nombre, narrativa académica, propuesta de valor y usuarios |
| [01. Descripción](01-project-overview.md) | Problema, módulos y alcance |
| [08. Requisitos](08-requirements.md) | RF, RNF y ambigüedades del enunciado |
| [09. Dominio](09-domain-model.md) | Entidades iniciales y reglas del móvil |

## Tecnología y arquitectura

| Documento | Responsabilidad |
| --- | --- |
| [02. Tecnologías](02-tech-stack.md) | Inventario, versiones declaradas, uso y estado |
| [03. Arquitectura](03-architecture.md) | Límites, dependencias y diseño objetivo |
| [14. Fundamentos](14-decision-rationale.md) | Motivos, alternativas, costos, evidencia y fuentes oficiales |
| [10. Transición al backend](10-backend-transition.md) | Hitos técnicos para integrar móvil, API y datos |

### Registros de decisiones arquitectónicas (ADR)

Los ADR conservan lo decidido y su evolución. Una ampliación documental no cambia la fecha de la decisión original.

| Registro | Estado |
| --- | --- |
| [ADR-001: React Native y Expo](adr/ADR-001-react-native-expo.md) | Aceptado |
| [ADR-002: TypeScript](adr/ADR-002-typescript.md) | Aceptado |
| [ADR-003: Firebase como backend](adr/ADR-003-firebase.md) | Reemplazado por ADR-005 |
| [ADR-004: Capas](adr/ADR-004-layered-architecture.md) | Aceptado |
| [ADR-005: NestJS y PostgreSQL](adr/ADR-005-nestjs-postgresql.md) | Aceptado; implementación parcial |
| [ADR-006: Monorepositorio](adr/ADR-006-monorepo.md) | Aceptado e integrado |
| [ADR-007: Autenticación y sesiones](adr/ADR-007-autenticacion-y-sesiones.md) | Aceptado e implementado |

## Trabajo diario y entregables

| Documento | Responsabilidad |
| --- | --- |
| [04. Entorno](04-development-environment.md) | Herramientas y referencia de la estación inicial |
| [05. Instalación](05-installation-and-setup.md) | Preparación y comandos del equipo |
| [06. Estado actual](06-current-status.md) | Hechos observados, fecha y validaciones |
| [07. Hoja de ruta](07-roadmap.md) | Orden de las fases técnicas |
| [11. Primer avance](11-first-advance-plan.md) | Pasos y aceptación del primer flujo integrado |
| [12. Cuatro avances](12-academic-advances.md) | Alcance y demostración de cada entrega |
| [13. Coordinación](13-team-coordination.md) | Responsables, revisión y colaboración |
| [15. Pendientes](15-pending-decisions.md) | Decisiones por resolver y dependencias del calendario |
| [16. Demostración del entregable 1](16-demostracion-entregable-1.md) | Guion reproducible, cuentas seed y evidencia |

Guías locales: [móvil](../apps/mobile/README.md), [API](../apps/api/README.md), [capas del móvil](../apps/mobile/src/README.md) y [paquetes compartidos](../packages/README.md). La historia está en [CHANGELOG](../CHANGELOG.md).

## Idioma, evidencia y mantenimiento

- Redactar explicaciones, guías y decisiones en español. Conservar nombres oficiales, identificadores, comandos y rutas técnicas.
- Mantener los nombres actuales de archivos para conservar enlaces e historial.
- No traducir licencias ni atribuir a Nexora condiciones de una plantilla. El [archivo histórico](archive/README.expo-template.md) conserva el README original de Expo en inglés.
- Actualizar el documento dueño del tema y enlazarlo; evitar repetir versiones y estados en todas las páginas.
- Separar **decidido**, **implementado localmente**, **integrado en Git** y **verificado**. Una carpeta o requisito no demuestra una función.
- Fechar comprobaciones y citar fuentes oficiales para capacidades técnicas. Distinguir razones históricas de evaluaciones posteriores.
- Actualizar documentación en el mismo Pull Request que el cambio. Enlazar toda nueva página desde este índice.

Los planes técnicos no sustituyen la rúbrica del curso. Fechas, nombres y aceptación académica se documentarán cuando estén disponibles.
