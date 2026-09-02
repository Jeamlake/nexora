# ADR-003: Firebase como backend administrado

- **Estado:** Reemplazado
- **Fecha de decisión original:** 2026-08-26
- **Fecha de reemplazo:** 2026-09-02
- **Reemplazado por:** [ADR-005: NestJS y PostgreSQL como backend principal](ADR-005-nestjs-postgresql.md)

## Contexto

El proyecto requiere autenticación, persistencia, tiempo real, fotografías, notificaciones y lógica del servidor.

## Alternativas

1. Firebase.
2. Supabase.
3. Backend propio Node/NestJS.
4. Backend REST + SQL.

## Decisión original

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

## Motivo del reemplazo

Antes de integrar Firebase se revisó el dominio completo de Nexora. Las relaciones entre condominios, unidades, residentes, visitantes, votos, alertas e incidencias, junto con las necesidades de auditoría y reglas transaccionales, justifican un backend propio con una base de datos relacional.

La decisión se reemplaza antes de crear persistencia o funcionalidades dependientes de Firebase, por lo que no existe una migración de datos ni código funcional que desechar.

## Elementos que se conservan

Firebase puede seguir utilizándose como servicio especializado:

- Firebase Cloud Messaging para notificaciones push;
- Firebase Authentication únicamente si una decisión posterior lo selecciona.

Firebase Realtime Database deja de formar parte de la arquitectura objetivo. El proveedor final de almacenamiento de imágenes y la estrategia de autenticación se decidirán por separado.

## Nota histórica

Firebase todavía no está integrado en el código.
