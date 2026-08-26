# Contribución al proyecto

## Regla principal

No desarrollar nuevas funcionalidades directamente sobre `main`.

## Flujo

`main` → rama de trabajo → commits → Pull Request → revisión → merge a `main`.

## Convención de ramas

- `feature/...` para funcionalidades.
- `fix/...` para correcciones.
- `docs/...` para documentación.
- `refactor/...` para refactorización.
- `test/...` para pruebas.
- `chore/...` para mantenimiento, configuración o tareas técnicas sin funcionalidad de negocio.

Ejemplos:

- `feature/authentication`
- `feature/visitor-qr`
- `fix/expired-pass`
- `docs/firebase-setup`
- `chore/nexora-branding`

## Commits

Se recomienda Conventional Commits:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `chore:`

Ejemplos:

- `feat: add resident authentication`
- `fix: prevent expired visitor pass validation`
- `docs: update firebase setup`

## Antes de un Pull Request

Verificar:

- que la aplicación inicie;
- que no existan secretos;
- que TypeScript no tenga errores;
- que las dependencias sigan siendo compatibles con Expo;
- que los requisitos afectados estén identificados;
- que la documentación afectada esté actualizada.

## Dependencias

No actualizar versiones mayores sin justificarlo.

No ejecutar `npm audit fix --force` automáticamente. Primero se debe revisar el impacto sobre Expo y React Native.

## Secretos

Nunca subir:

- `.env`;
- contraseñas;
- tokens administrativos;
- service accounts;
- claves privadas.

Las variables con prefijo `EXPO_PUBLIC_` forman parte del bundle cliente y no deben contener secretos.

## Arquitectura

Las nuevas funcionalidades deben respetar la separación descrita en `docs/03-architecture.md`.

## Requisitos

Los cambios funcionales deben relacionarse con los requisitos documentados en `docs/08-requirements.md`. Si un requisito cambia o se aclara, la documentación debe actualizarse en el mismo Pull Request.
