# Nexora Mobile

Cliente de Nexora con React Native, Expo SDK 57, Expo Router y TypeScript.

## Flujo implementado

El entregable 1 incluye:

- pantalla de inicio de sesión;
- navegación protegida con Expo Router;
- cliente HTTP configurado por `EXPO_PUBLIC_API_URL`;
- repositorio Data y casos de uso Domain;
- tokens nativos almacenados con Expo SecureStore;
- renovación de sesión y limpieza local al cerrar;
- pantalla de perfil con rol, condominio, unidad y hasta tres contactos;
- estados de carga, error, reintento, ausencia de contactos y sesión expirada.

## Configuración

```bash
cp apps/mobile/.env.example apps/mobile/.env.local
```

La variable pública puede conservar `http://localhost:3000/api/v1` para web y emulador: en Android Emulator el cliente sustituye `localhost` por `10.0.2.2`. Para un teléfono físico se debe usar la IP LAN de la computadora.

Las variables `EXPO_PUBLIC_*` quedan visibles en el bundle y no pueden contener secretos.

## Ejecución

Desde la raíz, con PostgreSQL y la API activos:

```bash
npm start
```

Después presionar `a` para Android, `w` para web o escanear el QR con Expo Go. También existen `npm run android`, `npm run ios` y `npm run web`.

Las dependencias de Expo se instalan desde este workspace con `npx expo install`. SecureStore se fijó en la versión compatible con SDK 57.

## Arquitectura

```text
src/app/                    rutas y pantallas
src/presentation/auth/      estado de sesión
src/domain/entities/        modelos y regla de tres contactos
src/domain/repositories/    contrato de autenticación/perfil
src/domain/use-cases/       acciones de la aplicación
src/data/api/               cliente y adaptador HTTP
src/data/storage/           SecureStore/localStorage
```

La pantalla no conoce `fetch` ni PostgreSQL. Data traduce el contrato HTTP a entidades de Domain. Consultar [arquitectura](../../docs/03-architecture.md) y [demostración](../../docs/16-demostracion-entregable-1.md).
