# ADR-007: Autenticación propia y sesiones revocables

- **Estado:** aceptado e implementado para el avance 1
- **Fecha:** 2026-09-10
- **Alcance:** inicio de sesión con correo y contraseña, renovación, cierre y autorización por rol

## Contexto

El primer avance debe probar un flujo móvil–API–PostgreSQL con una cuenta de demostración. Nexora ya había elegido una API propia con NestJS y PostgreSQL. Faltaba decidir si la identidad de este corte dependería de un proveedor administrado o quedaría bajo la misma API.

El enunciado también menciona acceso con celular, Google, recuperación y biometría. El plan académico los conserva para el avance 4, cuando puedan configurarse proveedores, enlaces de recuperación y capacidades nativas sin ocultar el flujo básico pendiente.

## Decisión

Para el avance 1 se implementa autenticación propia por correo y contraseña:

- la contraseña se almacena como `scrypt` con sal aleatoria; nunca como texto;
- la API entrega un JWT de acceso de 15 minutos;
- entrega además un token de renovación opaco de 30 días;
- PostgreSQL guarda únicamente el SHA-256 del token de renovación;
- cada renovación revoca el token anterior y crea una sesión nueva;
- el cierre revoca la sesión en el servidor y borra los tokens del dispositivo;
- cada ruta protegida comprueba firma, vencimiento, sesión y usuario activo;
- los roles `ADMIN_DIRECTIVE`, `RESIDENT` y `SECURITY_GUARD` se autorizan en la API;
- Expo guarda la sesión nativa mediante SecureStore. La salida web usa `localStorage` solo para desarrollo.

Los tiempos se configuran mediante `JWT_ACCESS_TTL_SECONDS` y `REFRESH_TOKEN_TTL_DAYS`. El secreto de firma solo existe en la API.

## Alternativas consideradas

### Proveedor administrado

Firebase Authentication, Supabase Auth o un servicio equivalente reducen parte del trabajo de identidad y facilitan proveedores sociales. Para este corte agregarían configuración externa y mantendrían pendiente la integración con los roles y datos propios. Siguen siendo alternativas válidas si el alcance de Google y recuperación del avance 4 lo justifica.

### Sesión opaca única

Una cookie o token opaco consultado en cada petición simplificaría la revocación, pero requiere una estrategia distinta para aplicaciones móviles y protección de cookies en web. El par access/refresh encaja con el cliente nativo y mantiene revocación explícita.

### JWT sin registro de sesión

Reduce consultas, pero el cierre no invalida inmediatamente un token ya emitido. Se descartó porque el entregable exige cierre de sesión verificable.

## Consecuencias

Nexora asume responsabilidad sobre contraseñas, sesiones, secretos y operación. Las pruebas comprueban credenciales inválidas, rutas protegidas, permisos, rotación y revocación. Rate limiting, recuperación, cambio de contraseña, Google, gestión de dispositivos y desbloqueo biométrico permanecen en el avance 4.

Las cuentas seed son solo para desarrollo y demostración. No se deben desplegar como credenciales reales.

## Referencias

- [Autenticación en Expo Router](https://docs.expo.dev/router/advanced/authentication/)
- [SecureStore para Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/securestore/)
- [Scrypt en Node.js](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
