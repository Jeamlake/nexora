# ADR-002: TypeScript como lenguaje principal

- **Estado:** Aceptado
- **Fecha:** 2026-08-26

## Contexto

El dominio contiene numerosas entidades y estados y será mantenido por varias personas.

## Alternativas

1. JavaScript.
2. TypeScript.

## Decisión

Utilizar TypeScript con configuración estricta.

## Razones

- tipos estáticos;
- mejor autocompletado;
- refactorización más segura;
- detección temprana de errores;
- contratos más claros.

## Consecuencias

### Positivas

- mayor mantenibilidad;
- menos errores triviales;
- interfaces más explícitas.

### Negativas

- curva de aprendizaje adicional;
- necesidad de modelar correctamente los tipos.

## Revisión documental del 2026-09-08

La fecha y decisión original se conservan. Las razones, alternativas y límites se amplían en [fundamentos](../14-decision-rationale.md), contrastados con fuentes oficiales. El [inventario](../02-tech-stack.md) y el [estado actual](../06-current-status.md) distinguen la decisión de su implementación local o integrada.
