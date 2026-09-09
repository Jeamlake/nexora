import { HealthService } from './health.service.js';

describe('HealthService', () => {
  it('informa que la API está disponible', () => {
    const result = new HealthService().getStatus();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('nexora-api');
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false);
  });
});
