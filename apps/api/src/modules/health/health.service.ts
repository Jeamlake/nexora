import { Injectable } from '@nestjs/common';
import type { HealthResponseDto } from './dto/health-response.dto.js';

@Injectable()
export class HealthService {
  public getStatus(): HealthResponseDto {
    return {
      status: 'ok',
      service: 'nexora-api',
      timestamp: new Date().toISOString(),
    };
  }
}
