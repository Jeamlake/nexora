import { HealthService } from './health.service.js';

describe('HealthService', () => {
  it('informa que la API y PostgreSQL están disponibles', async () => {
    const prisma = { $queryRaw: vi.fn().mockResolvedValue([{ value: 1 }]) };
    const result = await new HealthService(prisma as never).getStatus();

    expect(result.status).toBe('ok');
    expect(result.database).toBe('up');
    expect(result.service).toBe('nexora-api');
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false);
  });

  it('informa cuando PostgreSQL no está disponible', async () => {
    const prisma = {
      $queryRaw: vi.fn().mockRejectedValue(new Error('offline')),
    };
    const result = await new HealthService(prisma as never).getStatus();

    expect(result).toMatchObject({ status: 'error', database: 'down' });
  });
});
