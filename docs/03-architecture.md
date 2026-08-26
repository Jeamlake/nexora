# 03. Arquitectura

## Estado

Este documento describe la **arquitectura objetivo**. El baseline actual todavía conserva principalmente la estructura generada por Expo.

No debe confundirse arquitectura diseñada con funcionalidad ya implementada.

## Capas

```text
Presentation
     |
     v
Domain
     |
     v
Data
     |
     v
Firebase / servicios externos
```

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

Responsable de persistencia y acceso a información:

- implementaciones de repositorios;
- datasources;
- Firebase;
- mappers;
- DTO;
- servicios externos.

Domain no debe depender directamente de Firebase.

## Infraestructura prevista

- Firebase Authentication;
- Firebase Realtime Database;
- Firebase Cloud Storage;
- Firebase Cloud Messaging;
- Cloud Functions.

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

## Dependencias conceptuales

```text
Presentation -> Domain
Data -> Domain
Infrastructure -> Data
```

## Beneficios

- separación de responsabilidades;
- menor acoplamiento;
- pruebas más sencillas;
- sustitución futura de servicios;
- mantenibilidad;
- estructura defendible académicamente.

Toda decisión importante debe registrarse mediante ADR en `docs/adr/`.
