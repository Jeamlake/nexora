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

Ejemplos:

- `feature/authentication`
- `feature/visitor-qr`
- `fix/expired-pass`
- `docs/firebase-setup`

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

## Arquitectura

Las nuevas funcionalidades deben respetar la separación descrita en `docs/03-architecture.md`.
