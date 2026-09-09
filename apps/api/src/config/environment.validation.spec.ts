import { environmentValidationSchema } from './environment.validation.js';

describe('environmentValidationSchema', () => {
  it('aplica valores seguros por defecto', () => {
    const { error, value } = environmentValidationSchema.validate({});

    expect(error).toBeUndefined();
    expect(value).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
    });
  });

  it('rechaza puertos fuera del rango TCP', () => {
    const { error } = environmentValidationSchema.validate({ PORT: 70_000 });

    expect(error).toBeDefined();
  });
});
