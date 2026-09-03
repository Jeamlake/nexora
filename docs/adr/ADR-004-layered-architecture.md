# ADR-004: Arquitectura por capas

- **Estado:** Aceptado
- **Fecha:** 2026-08-26

## Contexto

Acoplar las pantallas directamente a Firebase dificultaría pruebas, mantenimiento y sustitución de servicios.

## Alternativas

1. Organización solo por pantallas.
2. Organización solo por features.
3. Arquitectura por capas.
4. Arquitectura híbrida feature + capas.

## Decisión

Separar conceptualmente:

- Presentation;
- Domain;
- Data;
- Infrastructure.

La estructura podrá combinarse con features cuando el tamaño lo justifique.

## Consecuencias positivas

- responsabilidades claras;
- dominio desacoplado;
- pruebas más sencillas;
- mayor mantenibilidad.

## Consecuencias negativas

- más archivos;
- disciplina adicional;
- mayor complejidad inicial.

## Estado de implementación

La estructura base fue creada y el Domain Core inicial está implementado en `apps/mobile`. Data todavía no contiene repositorios funcionales; sus futuras implementaciones consumirán `apps/api` según ADR-005 y ADR-006.
