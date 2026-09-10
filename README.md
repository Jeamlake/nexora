# Nexora

**Tu comunidad, conectada.**

Aplicación móvil para gestión y convivencia residencial. Conecta residentes, administración y seguridad alrededor de avisos, encuestas, visitas, incidencias y alertas comunitarias. Es el proyecto del curso **Desarrollo de Aplicaciones Móviles** y se organiza en cuatro entregables acumulativos.

## Estado

El entregable 1 implementa el primer flujo vertical completo:

```text
Expo -> NestJS/OpenAPI -> Prisma -> PostgreSQL
```

Incluye inicio y cierre de sesión, renovación revocable, tres roles, perfil residente, condominio, unidad, contactos de emergencia, migración, seed, Docker Compose, pruebas y CI. El móvil consulta datos reales de PostgreSQL por medio de la API.

Avisos/encuestas/visitantes corresponden al entregable 2; alertas/incidencias/capacidades nativas al 3; y endurecimiento, recuperación, Google, biometría y distribución final al 4.

## Inicio rápido

Requiere Node.js 22.22.3, npm 10 o superior y Docker Desktop.

```bash
npm ci
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env.local
npm run db:up
npm run db:migrate
npm run db:seed
```

Luego usar dos terminales:

```bash
npm run api:start:dev
```

```bash
npm start
```

Cuenta de demostración: `residente@nexora.local` / `Nexora2026!`.

Abrir [health](http://localhost:3000/api/v1/health) y [Swagger](http://localhost:3000/docs). El guion completo está en [demostración del entregable 1](docs/16-demostracion-entregable-1.md).

## Validación

Con la base migrada y sembrada:

```bash
npm run check
```

El comando genera Prisma Client y ejecuta lint, formato, tipos, pruebas unitarias y HTTP, compilaciones y Expo Doctor. GitHub Actions crea PostgreSQL, aplica la migración y carga el seed antes de repetir el mismo control.

## Organización

```text
apps/mobile/    cliente Expo con Presentation, Domain y Data
apps/api/       API NestJS y Prisma
packages/       reservado para código realmente compartido
docs/           producto, requisitos, decisiones y entregables
compose.yaml    PostgreSQL local reproducible
```

## Documentación en español

- [Índice general](docs/README.md)
- [Qué es Nexora](docs/01-project-overview.md)
- [Por qué se eligieron las tecnologías](docs/14-decision-rationale.md)
- [Arquitectura](docs/03-architecture.md)
- [Instalación](docs/05-installation-and-setup.md)
- [Los cuatro entregables](docs/12-academic-advances.md)
- [Plan del entregable 1](docs/11-first-advance-plan.md)
- [Autenticación y sesiones](docs/adr/ADR-007-autenticacion-y-sesiones.md)
- [Demostración del entregable 1](docs/16-demostracion-entregable-1.md)

`main` representa el estado estable. Los cambios se revisan por Pull Request según [CONTRIBUTING](CONTRIBUTING.md). Los `.env`, secretos y datos personales reales no se versionan.

El [LICENSE](LICENSE) fue heredado de Expo; la licencia del código original de Nexora sigue pendiente de decisión del equipo.
