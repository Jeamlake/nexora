# Nexora Mobile

Aplicación cliente de Nexora construida con React Native, Expo SDK 57, Expo Router y TypeScript.

## Estado

El baseline y el Domain Core inicial están implementados. Todavía no existe autenticación ni conexión funcional con `apps/api`.

## Ejecución desde la raíz

```shell
npm ci
npm run check
npm start
```

También están disponibles:

```shell
npm run android
npm run ios
npm run web
```

## Comandos específicos de Expo

Los comandos de Expo o EAS que no estén expuestos por la raíz deben ejecutarse desde este directorio:

```shell
cd apps/mobile
npx expo config --type public
```

Las dependencias compatibles con Expo deben instalarse aquí mediante `npx expo install`. El cambio actualizará `apps/mobile/package.json` y el `package-lock.json` de la raíz.

## Configuración

Copiar `.env.example` a `.env.local` y ajustar `EXPO_PUBLIC_API_URL` para el entorno utilizado. Las variables `EXPO_PUBLIC_*` son visibles en el bundle y nunca deben contener secretos.

## Arquitectura

El código se mantiene en `src` y conserva las capas Presentation, Domain y Data. Consultar:

- [`src/README.md`](src/README.md);
- [`../../docs/03-architecture.md`](../../docs/03-architecture.md);
- [`../../docs/05-installation-and-setup.md`](../../docs/05-installation-and-setup.md).
