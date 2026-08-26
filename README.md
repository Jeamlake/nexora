# Nexora

**Tu comunidad, conectada.**

Nexora es una plataforma móvil de gestión y convivencia residencial diseñada para centralizar comunicación, participación comunitaria, visitantes, incidencias y respuesta temprana ante emergencias.

> **Estado actual:** baseline técnico operativo y documentación inicial. Las funcionalidades de negocio todavía no están implementadas.

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

- [Identidad de producto](docs/00-product-identity.md)
- [Descripción del proyecto](docs/01-project-overview.md)
- [Stack tecnológico](docs/02-tech-stack.md)
- [Arquitectura](docs/03-architecture.md)
- [Entorno de desarrollo](docs/04-development-environment.md)
- [Instalación en otra computadora](docs/05-installation-and-setup.md)
- [Estado actual](docs/06-current-status.md)
- [Roadmap](docs/07-roadmap.md)
- [Requisitos y decisiones pendientes](docs/08-requirements.md)
- [Decisiones arquitectónicas](docs/adr/)

## Desarrollo

`main` representa el estado estable.

Las nuevas tareas deben realizarse en ramas como:

- `feature/...`
- `fix/...`
- `docs/...`
- `refactor/...`
- `test/...`
- `chore/...`

Consulta [CONTRIBUTING.md](CONTRIBUTING.md).

## Seguridad

No subir contraseñas, claves privadas, service accounts, tokens administrativos ni archivos `.env` reales.

`.env.example` documenta únicamente los nombres de variables que el proyecto podrá requerir. Las variables `EXPO_PUBLIC_*` forman parte de la configuración cliente y no deben utilizarse para secretos privados.

## Licencia

Proyecto académico privado. No se ha definido una licencia pública.

---

Identidad Nexora adoptada: 2026-08-26.
