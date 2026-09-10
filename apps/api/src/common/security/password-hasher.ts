import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt$${salt.toString('base64url')}$${derivedKey.toString('base64url')}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [algorithm, saltText, hashText] = storedHash.split('$');
  if (algorithm !== 'scrypt' || !saltText || !hashText) {
    return false;
  }

  const expected = Buffer.from(hashText, 'base64url');
  const derivedKey = (await scrypt(
    password,
    Buffer.from(saltText, 'base64url'),
    expected.length,
  )) as Buffer;

  return (
    expected.length === derivedKey.length &&
    timingSafeEqual(expected, derivedKey)
  );
}
