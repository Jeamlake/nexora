import { environmentValidationSchema } from './environment.validation.js';

describe('environmentValidationSchema', () => {
  it('aplica valores seguros por defecto', () => {
    const { error, value } = environmentValidationSchema.validate({
      DATABASE_URL: 'postgresql://nexora:local@localhost:5432/nexora',
      JWT_ACCESS_SECRET: 'un-secreto-de-prueba-de-mas-de-32-caracteres',
    });

    expect(error).toBeUndefined();
    expect(value).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
      JWT_ACCESS_TTL_SECONDS: 900,
      REFRESH_TOKEN_TTL_DAYS: 30,
    });
  });

  it('rechaza puertos fuera del rango TCP', () => {
    const { error } = environmentValidationSchema.validate({
      PORT: 70_000,
      DATABASE_URL: 'postgresql://nexora:local@localhost:5432/nexora',
      JWT_ACCESS_SECRET: 'un-secreto-de-prueba-de-mas-de-32-caracteres',
    });

    expect(error).toBeDefined();
  });
});
