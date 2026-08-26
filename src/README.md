# Arquitectura de `src`

Nexora organiza su código de aplicación en capas para separar responsabilidades y mantener el dominio desacoplado de detalles externos.

## `app/`

Directorio requerido por Expo Router. Define rutas y layouts y actúa como frontera de navegación hacia Presentation.

## `presentation/`

Interfaz de usuario y estado de presentación:

- `components/`
- `hooks/`
- `screens/`

Presentation puede depender de Domain.

## `domain/`

Núcleo de negocio:

- `entities/`
- `repositories/`
- `use-cases/`

Domain no debe depender de Firebase ni de implementaciones de Data.

## `data/`

Acceso a datos e implementaciones:

- `datasources/`
- `firebase/`
- `mappers/`
- `repositories/`

Data implementa contratos definidos por Domain.

## `shared/`

Elementos reutilizables y sin dependencia de negocio específica:

- `constants/`
- `types/`
- `utils/`

## `config/`

Configuración transversal de la aplicación.

La explicación completa y las reglas de dependencia se mantienen en `docs/03-architecture.md`.
