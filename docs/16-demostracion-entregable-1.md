# 16. Demostración del entregable 1

## Resultado

El entregable 1 demuestra este recorrido con datos reales:

```text
PostgreSQL -> Prisma -> NestJS/OpenAPI -> repositorio Data
           -> caso de uso Domain -> login y perfil en Expo
```

El residente inicia sesión, consulta rol, condominio, unidad y contactos, y cierra la sesión. La API registra el último acceso y PostgreSQL impide un cuarto contacto de emergencia.

## Preparación desde Git Bash

Requisitos: Node.js 22.22.3, npm 10 o superior, Docker Desktop y Expo Go o un emulador Android.

```bash
git pull origin main
npm ci
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env.local
npm run db:up
npm run db:migrate
npm run db:seed
```

`compose.yaml` usa PostgreSQL 18.6, publica el puerto local `5432` y conserva los datos en el volumen `nexora_postgres_data`.

## Ejecutar

Terminal 1, desde la raíz:

```bash
npm run api:start:dev
```

Terminal 2, desde la raíz:

```bash
npm start
```

En Expo:

- presionar `a` para abrir Android Emulator; o
- escanear el QR con Expo Go en un teléfono conectado a la misma red.

En el emulador Android, el cliente cambia automáticamente `localhost` por `10.0.2.2`. En un teléfono físico se debe reemplazar `localhost` en `apps/mobile/.env.local` por la IP LAN de la computadora, por ejemplo `http://192.168.1.20:3000/api/v1`.

## Cuenta principal de la demostración

| Campo | Valor |
| --- | --- |
| Correo | `residente@nexora.local` |
| Contraseña | `Nexora2026!` |
| Rol | Residente |
| Unidad | A-301 |

El seed también crea `administrador@nexora.local` y `seguridad@nexora.local` con la misma contraseña para las pruebas de autorización de API. Son datos locales, no credenciales de producción.

## Evidencia observable

1. Abrir `http://localhost:3000/api/v1/health`: debe responder `status: ok` y `database: up`.
2. Abrir `http://localhost:3000/docs`: Swagger debe mostrar autenticación, perfil y residentes.
3. Iniciar sesión en Expo con la cuenta principal.
4. Comprobar que la pantalla muestra “Condominio Los Jardines”, “A-301” y dos contactos.
5. Cerrar sesión y comprobar el regreso a la pantalla de acceso.
6. Ejecutar `npm run check` con PostgreSQL preparado: deben pasar lint, formato, tipos, pruebas unitarias, pruebas HTTP, builds y Expo Doctor.

## Pruebas automáticas incluidas

- hash y verificación de contraseñas;
- configuración obligatoria del servidor;
- disponibilidad real de PostgreSQL;
- credenciales válidas e inválidas;
- ruta protegida sin sesión;
- perfil obtenido desde la base;
- restricción de residentes según rol;
- rotación y reutilización inválida de refresh token;
- revocación al cerrar sesión;
- rechazo del cuarto contacto en PostgreSQL;
- normalización del correo, cliente HTTP y mapeo hacia Domain.

## Reinicio local controlado

Si se necesita reconstruir únicamente la base local de desarrollo:

```bash
npm run db:reset
npm run db:seed
```

`db:reset` elimina los datos del contenedor configurado; no debe apuntarse a una base compartida o de producción.

## Alcance que sigue después

Avisos, encuestas, visitantes/QR, alertas, incidencias, Google, recuperación y biometría pertenecen a los entregables posteriores. La rúbrica, fecha y formato académico siguen necesitando el documento oficial del curso.
