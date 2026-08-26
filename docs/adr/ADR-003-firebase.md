# ADR-003: Firebase como backend administrado

- **Estado:** Aceptado para implementación
- **Fecha:** 2026-08-26

## Contexto

El proyecto requiere autenticación, persistencia, tiempo real, fotografías, notificaciones y lógica del servidor.

## Alternativas

1. Firebase.
2. Supabase.
3. Backend propio Node/NestJS.
4. Backend REST + SQL.

## Decisión

Utilizar Firebase como backend principal inicial.

## Servicios previstos

- Authentication;
- Realtime Database;
- Cloud Storage;
- Cloud Messaging;
- Cloud Functions.

## Razones

- integración móvil;
- tiempo real;
- infraestructura administrada;
- menos trabajo DevOps;
- rapidez de implementación.

## Consecuencias positivas

- menor infraestructura;
- mayor velocidad de desarrollo;
- servicios integrados.

## Consecuencias negativas

- dependencia del proveedor;
- diseño de datos distinto a SQL tradicional;
- reglas de seguridad críticas;
- posibles costos al escalar.

## Nota

Firebase todavía no está integrado en el código.
