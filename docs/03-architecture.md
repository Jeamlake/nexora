# 03. Arquitectura

## Estado

Este documento describe la **arquitectura objetivo**. El baseline actual todavía conserva principalmente la estructura generada por Expo.

No debe confundirse arquitectura diseñada con funcionalidad ya implementada.

## Correspondencia con el requisito de mantenibilidad

El caso solicita una arquitectura en capas de:

- **presentación**;
- **lógica de negocio**;
- **acceso a datos**.

En Nexora se utilizarán los nombres:

- **Presentation** → presentación;
- **Domain** → lógica de negocio;
- **Data** → acceso a datos.

Firebase y otros servicios externos son detalles de infraestructura consumidos desde la capa Data.

## Flujo de ejecución conceptual

```text
Usuario
  |
  v
Presentation
  |
  v
Domain / Use Cases
  |
  v
Repository Interface (Domain)
  ^
  |
Data Repository Implementation
  |
  v
Firebase / servicios externos
```

El diagrama anterior representa el flujo de ejecución y la inversión de dependencias: **Domain define los contratos y Data los implementa**.

## Regla de dependencias

```text
Presentation -> Domain
Data         -> Domain
Firebase     <- Data
```

**Domain no depende de Firebase ni de las implementaciones de Data.**

## Presentation

Responsable de interacción con el usuario:

- pantallas;
- componentes;
- navegación;
- hooks de presentación;
- estado visual.

## Domain

Núcleo de negocio:

- entidades;
- interfaces de repositorio;
- casos de uso;
- reglas;
- tipos de dominio.

Ejemplos futuros:

- `Resident`
- `Unit`
- `VisitorPass`
- `EmergencyAlert`
- `Incident`
- `Poll`

## Data

Responsable de acceso y persistencia:

- implementaciones de repositorios;
- datasources;
- integración con Firebase;
- mappers;
- DTO;
- adaptadores de servicios externos.

## Infraestructura prevista

- Firebase Authentication;
- Firebase Realtime Database;
- Firebase Cloud Storage;
- Firebase Cloud Messaging;
- Cloud Functions.

Estas tecnologías están previstas, pero todavía no están integradas en el código.

## Estructura objetivo

```text
src/
├── app/
├── presentation/
│   ├── components/
│   ├── hooks/
│   └── screens/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── use-cases/
├── data/
│   ├── datasources/
│   ├── firebase/
│   ├── mappers/
│   └── repositories/
├── shared/
│   ├── constants/
│   ├── types/
│   └── utils/
└── config/
```

La estructura completa todavía no está implementada.

## Beneficios

- separación de responsabilidades;
- menor acoplamiento;
- pruebas más sencillas;
- sustitución futura de servicios;
- mantenibilidad;
- correspondencia explícita con el requisito académico de arquitectura por capas.

Toda decisión importante debe registrarse mediante ADR en `docs/adr/`.
