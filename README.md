# Nexora

**Tu comunidad, conectada.**

Nexora es una plataforma móvil de gestión y convivencia residencial diseñada para centralizar comunicación, participación comunitaria, visitantes, incidencias y respuesta temprana ante emergencias.

> **Estado actual:** `Jeamlake/nexora` está organizado como monorepo. El móvil vive en `apps/mobile`; `apps/api` está reservado para el siguiente paso y todavía no contiene una API funcional.

## ¿Por qué nace Nexora?

En el escenario analizado, la información y los procesos de una comunidad residencial pueden quedar repartidos entre grupos de mensajería, llamadas, mensajes privados y registros manuales.

El problema no es únicamente la ausencia de herramientas digitales, sino la **fragmentación de la gestión residencial**.

Nexora propone reunir los principales procesos de convivencia en una sola aplicación para conectar a residentes, administración y seguridad mediante flujos organizados y trazables.

## Propuesta de valor

> Centralizar la vida digital de una comunidad residencial en una sola aplicación.

## Pilares

- **Comunicar:** avisos e información oficial.
- **Participar:** encuestas y decisiones comunitarias.
- **Gestionar:** visitantes e incidencias.
- **Proteger:** alertas y respuesta comunitaria.

## Stack principal

| Tecnología | Baseline | Uso |
| --- | --- | --- |
| React Native | `0.86.3` | Desarrollo móvil Android/iOS |
| Expo | `~57.0.19` | Framework y toolchain |
| React | `19.2.3` | Componentes e interfaz |
| TypeScript | `~6.0.3` | Lenguaje principal |
| Expo Router | `~57.0.18` | Navegación basada en archivos |
| Node.js | `v22.21.1` | Entorno de desarrollo |
| Android | API 36 | Plataforma Android de referencia |
| NestJS | Arquitectura aceptada; workspace pendiente | API y reglas de negocio del servidor |
| PostgreSQL | Arquitectura aceptada; pendiente | Persistencia relacional |
| Prisma | Arquitectura aceptada; pendiente | ORM y migraciones del backend |
| Firebase Cloud Messaging | Pendiente | Notificaciones push especializadas |
| Git / GitHub | Activo | Control de versiones y colaboración |

## Estado verificado

- TypeScript sin errores.
- Expo Doctor: 21/21 checks correctos el 2026-09-02.
- Monorepo validado el 2026-09-03: instalación, TypeScript, configuración Expo y exportación web correctas desde la nueva estructura.
- npm Audit: 14 vulnerabilidades moderadas transitivas; 0 High y 0 Critical. No se aplicó `--force`.
- Android Emulator operativo.
- Android 16 / API 36.
- Expo Go operativo.
- Metro Bundler compilando correctamente.
- Repositorio Git y GitHub configurados.

## Documentación

Consulta [`docs/README.md`](docs/README.md).

Documentos principales:

- [Identidad de producto](docs/00-product-identity.md)
- [Descripción del proyecto](docs/01-project-overview.md)
- [Stack tecnológico](docs/02-tech-stack.md)
- [Arquitectura](docs/03-architecture.md)
- [Entorno de desarrollo](docs/04-development-environment.md)
- [Instalación en otra computadora](docs/05-installation-and-setup.md)
- [Estado actual](docs/06-current-status.md)
- [Roadmap](docs/07-roadmap.md)
- [Requisitos y decisiones pendientes](docs/08-requirements.md)
- [Modelo de dominio inicial](docs/09-domain-model.md)
- [Transición al backend propio](docs/10-backend-transition.md)
- [Plan del primer avance](docs/11-first-advance-plan.md)
- [Distribución de los cuatro avances](docs/12-academic-advances.md)
- [Coordinación del equipo](docs/13-team-coordination.md)
- [Decisiones arquitectónicas](docs/adr/)

## Organización del monorepositorio

```text
apps/
├── mobile/    Aplicación Expo existente
└── api/       Frontera reservada para NestJS
packages/      Código compartido solo cuando tenga varios consumidores
docs/          Documentación transversal y ADR
```

La decisión, alternativas, variables y criterios de revisión están documentados en [ADR-006](docs/adr/ADR-006-monorepo.md).

## Arquitectura objetivo

```text
Nexora Mobile
React Native + Expo
        |
        | HTTPS / WebSocket
        v
NestJS modular monolith
        |
        +-- PostgreSQL / Prisma
        +-- Firebase Cloud Messaging
        +-- Object Storage
```

Firebase ya no es el backend principal. La evolución de esta decisión se conserva en [ADR-003](docs/adr/ADR-003-firebase.md) y [ADR-005](docs/adr/ADR-005-nestjs-postgresql.md).

## Desarrollo

`main` representa el estado estable.

Las nuevas tareas deben realizarse en ramas como:

- `feature/...`
- `fix/...`
- `docs/...`
- `refactor/...`
- `test/...`
- `chore/...`

Consulta [CONTRIBUTING.md](CONTRIBUTING.md). Para preparar el proyecto en Windows, macOS o Linux, utiliza [la guía de instalación](docs/05-installation-and-setup.md).

## Seguridad

No subir contraseñas, claves privadas, service accounts, tokens administrativos ni archivos `.env` reales.

Cada aplicación mantiene su propio `.env.example`. Las variables `EXPO_PUBLIC_*` de `apps/mobile` forman parte de la configuración cliente y no deben utilizarse para secretos privados.

## Licencia

El repositorio es público. El archivo `LICENSE` actual fue heredado de la plantilla de Expo y conserva el copyright de Expo; el equipo todavía debe tomar una decisión explícita sobre la licencia aplicable al código original de Nexora antes de la entrega final.

---

Identidad Nexora adoptada: 2026-08-26.
