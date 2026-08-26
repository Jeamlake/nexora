# ADR-001: React Native con Expo

- **Estado:** Aceptado
- **Fecha:** 2026-08-26

## Contexto

La aplicación requiere Android, potencial soporte iOS, cámara, ubicación, notificaciones, biometría, vibración y QR.

## Alternativas

1. Kotlin Android.
2. Flutter.
3. React Native sin framework.
4. React Native con Expo.

## Decisión

Utilizar **React Native con Expo**.

## Razones

- multiplataforma;
- TypeScript;
- ecosistema amplio;
- APIs móviles;
- Expo Router;
- Development Builds;
- EAS.

## Consecuencias positivas

- reutilización de código;
- menor complejidad inicial;
- desarrollo más rápido;
- herramientas integradas.

## Consecuencias negativas

- algunas capacidades requerirán Development Build;
- dependencia del ciclo de compatibilidad de Expo;
- ciertas integraciones exigirán configuración nativa.

## Revisión

Revisar solo si aparece una limitación técnica demostrable.
