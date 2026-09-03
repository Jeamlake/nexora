# ADR-006: Monorepositorio para Nexora

- **Estado:** Aceptado
- **Fecha:** 2026-09-03
- **Modifica:** la separación física de repositorios prevista en [ADR-005](ADR-005-nestjs-postgresql.md)

## Contexto

Nexora tendrá una aplicación móvil y una API que evolucionarán como partes del mismo producto. El equipo actual está formado por cuatro colaboradores, comparte calendario académico y necesita reproducir el proyecto completo en diferentes computadoras.

La propuesta anterior ubicaba el móvil y la API en repositorios independientes. Esa separación es válida, pero obligaría al equipo actual a coordinar dos clones, dos historiales, Pull Requests relacionados, contratos publicados y documentación distribuida antes de existir equipos o ciclos de entrega independientes.

Expo SDK 57 tiene soporte de monorepos mediante workspaces. Con npm workspaces, Expo detecta la raíz y configura Metro automáticamente; no se añadirá una configuración manual de resolución mientras no exista una necesidad comprobada.

## Variables consideradas

Las siguientes variables determinan la decisión:

- **topología del equipo:** cuatro personas trabajando sobre un solo producto;
- **cantidad de clientes:** una aplicación móvil durante los primeros avances;
- **consumidores de la API:** únicamente Nexora en el alcance actual;
- **ciclo de entrega:** móvil y backend avanzan bajo las mismas cuatro entregas académicas;
- **frecuencia de cambios coordinados:** alta durante la creación de contratos y flujos verticales;
- **permisos:** no existen requisitos actuales de acceso separado al código del backend;
- **despliegue:** móvil y API necesitan artefactos independientes, aunque compartan repositorio;
- **reproducibilidad:** un colaborador debe preparar el sistema completo desde un solo punto de entrada;
- **lenguaje y runtime:** ambos usan TypeScript y Node.js 22;
- **gestor de dependencias:** npm con un lockfile único;
- **CI:** debe validar cada aplicación y permitir filtros por rutas;
- **contratos:** OpenAPI será la fuente del contrato HTTP;
- **riesgo de acoplamiento:** el código compartido debe limitarse y no incluir modelos de persistencia;
- **soporte de herramientas:** Expo SDK 57 y NestJS pueden operar dentro de npm workspaces;
- **costo de transición:** bajo porque la API todavía no existe y el móvil es pequeño;
- **crecimiento futuro:** la estructura debe permitir separar una aplicación si aparecen equipos, permisos o ciclos realmente independientes.

## Alternativas consideradas

1. **Repositorios separados:** `nexora-mobile` y `nexora-api`.
2. **Monorepositorio con workspaces:** `apps/mobile`, `apps/api` y paquetes compartidos solo cuando sean necesarios.
3. **Un único paquete mezclado:** móvil y backend dentro del mismo `src` y `package.json`.

## Matriz de decisión

La escala es de 1 a 5, donde 5 representa mejor ajuste para Nexora. Los pesos expresan las prioridades actuales del equipo; no constituyen una regla universal para otros proyectos.

| Criterio | Peso | Repositorios separados | Monorepo con workspaces | Paquete mezclado |
| --- | ---: | ---: | ---: | ---: |
| Incorporación y reproducción | 5 | 3 | 5 | 4 |
| Cambios atómicos móvil-API | 5 | 2 | 5 | 5 |
| Despliegues independientes | 4 | 5 | 4 | 2 |
| Permisos y autonomía de equipos | 2 | 5 | 3 | 1 |
| Documentación y trazabilidad | 4 | 3 | 5 | 3 |
| Simplicidad de CI en la etapa actual | 3 | 3 | 4 | 4 |
| Complejidad sostenible de herramientas | 3 | 4 | 3 | 2 |
| Gestión del contrato HTTP | 4 | 2 | 5 | 3 |
| Costo de transición actual | 3 | 3 | 4 | 5 |
| Protección contra acoplamiento accidental | 4 | 5 | 3 | 1 |
| **Resultado ponderado** |  | **125** | **157** | **116** |

Los repositorios separados conservan ventaja cuando existen permisos, equipos o ciclos independientes. Esas condiciones tienen poco peso ahora porque no forman parte del contexto real del proyecto.

## Decisión

Mantener un único repositorio de producto, con nombre objetivo `nexora`, administrado mediante npm workspaces:

```text
nexora/
├── apps/
│   ├── mobile/
│   └── api/
├── packages/
├── docs/
├── package.json
├── package-lock.json
└── compose.yaml        # cuando se incorpore PostgreSQL
```

El remoto fue renombrado a `Jeamlake/nexora` después de integrar la reorganización y comunicar el cambio a los colaboradores. La estructura del monorepositorio no depende del nombre de una carpeta local.

## Responsabilidad de cada área

### Raíz

- workspaces y scripts orquestadores;
- lockfile único;
- documentación transversal;
- políticas de contribución;
- CI del producto;
- infraestructura local compartida.

### `apps/mobile`

- Expo, React Native y Expo Router;
- Presentation, Domain y Data del cliente;
- configuración y assets móviles;
- variables públicas `EXPO_PUBLIC_*`;
- configuración futura de EAS y builds móviles.

### `apps/api`

- NestJS y módulos del servidor;
- Prisma y migraciones;
- autenticación, autorización y reglas definitivas;
- OpenAPI, WebSockets y adaptadores de infraestructura;
- variables y secretos exclusivos del backend.

### `packages`

Solo contendrá código con consumidores reales en más de una aplicación. No se compartirán entidades de Prisma, módulos NestJS ni detalles de Expo. OpenAPI seguirá siendo la fuente de verdad del contrato HTTP; un cliente o tipos compartidos podrán generarse a partir de él cuando exista esa necesidad.

## Reglas operativas

1. Ejecutar `npm ci` desde la raíz.
2. Mantener un solo `package-lock.json` en la raíz.
3. Declarar cada dependencia en el workspace que realmente la utiliza.
4. Ejecutar los comandos específicos de Expo desde `apps/mobile` o mediante los scripts raíz.
5. Evitar versiones duplicadas de React, React Native y módulos nativos.
6. Mantener `.env` separados por aplicación y versionar únicamente archivos `.env.example`.
7. Validar móvil y API de forma independiente en CI, además del check agregado de la raíz.
8. Permitir despliegues separados: compartir repositorio no implica compartir proceso ni artefacto de despliegue.
9. Coordinar cambios del contrato en un mismo Pull Request cuando afecten móvil y API.
10. No crear paquetes compartidos de forma preventiva.

## Consecuencias positivas

- un solo clon y punto de entrada para el equipo;
- cambios cliente-servidor atómicos;
- documentación y decisiones centralizadas;
- un único flujo de ramas y Pull Requests;
- instalación coherente mediante un lockfile;
- menor costo de coordinación durante los cuatro avances;
- posibilidad de ejecutar CI y despliegues separados por workspace.

## Consecuencias negativas y mitigaciones

- **Mayor configuración en la raíz:** se limita a npm workspaces y scripts explícitos.
- **Riesgo de dependencias duplicadas:** se comprobará con Expo Doctor y `npm why` cuando cambien dependencias nativas.
- **CI puede crecer:** se usarán validaciones por workspace y filtros de rutas cuando sea necesario.
- **Acoplamiento accidental:** las fronteras de `apps` y la autoridad de OpenAPI se mantienen documentadas.
- **Repositorio más grande:** se excluirán artefactos, builds, cachés y datos locales mediante `.gitignore`.

## Nombre del repositorio

El nombre `nexora` representa todo el producto y no solamente la aplicación móvil. El repositorio remoto fue renombrado el 2026-09-03. Los clones existentes deben actualizar `origin`; la carpeta local puede renombrarse después de cerrar las aplicaciones que la mantengan abierta.

```shell
git remote set-url origin git@github.com:Jeamlake/nexora.git
git remote -v
```

## Criterios para revisar la decisión

Evaluar una separación futura solamente si aparece al menos una de estas condiciones:

- equipos distintos con autonomía sostenida;
- permisos o requisitos regulatorios que exijan separar código;
- API consumida y versionada independientemente por varios productos;
- ciclos de lanzamiento incompatibles;
- CI o tamaño del repositorio con impacto medido que no pueda resolverse con filtros o caché;
- adquisición, cesión o despliegue independiente de una parte del producto.

Si ocurre, la separación deberá conservar historial y contrato; no se hará únicamente por percepción de escalabilidad.

## Referencias

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo: trabajar con monorepos](https://docs.expo.dev/guides/monorepos/)
- [Expo: EAS Build con monorepos](https://docs.expo.dev/build-reference/build-with-monorepos/)
