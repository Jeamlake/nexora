# Condominio Alerta Comunitaria

Aplicación móvil multiplataforma orientada a la gestión de condominios, comunicación comunitaria, control de visitantes, reporte de incidencias y atención temprana de emergencias.

> **Estado actual:** baseline técnico funcional. El entorno, el proyecto base, Android y GitHub están preparados. Las funcionalidades de negocio todavía están en fase de implementación.

## Objetivo

Centralizar en una aplicación móvil:

- usuarios, residentes, directiva y seguridad;
- avisos y encuestas;
- preautorización de visitantes mediante QR;
- alertas comunitarias de emergencia;
- reportes de incidencias;
- notificaciones y comunicación en tiempo real.

## Stack principal

| Tecnología | Baseline | Uso |
| --- | --- | --- |
| React Native | `0.86.2` | Desarrollo móvil Android/iOS |
| Expo | `~57.0.16` | Framework y toolchain |
| React | `19.2.3` | Componentes e interfaz |
| TypeScript | `~6.0.3` | Lenguaje principal |
| Expo Router | `~57.0.16` | Navegación basada en archivos |
| Node.js | `v22.21.1` | Entorno de desarrollo |
| Android | API 36 | Plataforma Android de referencia |
| Firebase | Pendiente de integración | Backend administrado |
| Git / GitHub | Activo | Control de versiones y colaboración |

## Estado verificado

- Expo Doctor: 21/21 checks correctos.
- Dependencias compatibles con Expo SDK 57.
- Android Emulator operativo.
- Android 16 / API 36.
- Expo Go operativo.
- Metro Bundler compilando correctamente.
- Repositorio Git y GitHub configurados.

## Documentación

Consulta [`docs/README.md`](docs/README.md).

Documentos principales:

- [Descripción del proyecto](docs/01-project-overview.md)
- [Stack tecnológico](docs/02-tech-stack.md)
- [Arquitectura](docs/03-architecture.md)
- [Entorno de desarrollo](docs/04-development-environment.md)
- [Instalación en otra computadora](docs/05-installation-and-setup.md)
- [Estado actual](docs/06-current-status.md)
- [Roadmap](docs/07-roadmap.md)
- [Decisiones arquitectónicas](docs/adr/)

## Flujo de trabajo

`main` representa el estado estable.

Las nuevas tareas deben realizarse en ramas como:

- `feature/...`
- `fix/...`
- `docs/...`
- `refactor/...`
- `test/...`

Consulta [CONTRIBUTING.md](CONTRIBUTING.md).

## Seguridad

No subir credenciales privadas, contraseñas, claves administrativas ni archivos `.env` reales.

Se proporciona `.env.example` como referencia.

## Licencia

Proyecto académico privado. No se ha definido una licencia pública.

---

Baseline documentado: 2026-08-26.
