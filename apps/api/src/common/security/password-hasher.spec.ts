import { hashPassword, verifyPassword } from './password-hasher.js';

describe('password-hasher', () => {
  it('crea un hash con sal y verifica solo la contraseña correcta', async () => {
    const firstHash = await hashPassword('Clave segura 2026');
    const secondHash = await hashPassword('Clave segura 2026');

    expect(firstHash).not.toBe(secondHash);
    await expect(verifyPassword('Clave segura 2026', firstHash)).resolves.toBe(
      true,
    );
    await expect(verifyPassword('otra clave', firstHash)).resolves.toBe(false);
  });
});
