import { Injectable } from '@nestjs/common';
import type { HealthResponseDto } from './dto/health-response.dto.js';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class HealthService {
  public constructor(private readonly prisma: PrismaService) {}

  public async getStatus(): Promise<HealthResponseDto> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return this.response('ok', 'up');
    } catch {
      return this.response('error', 'down');
    }
  }

  private response(
    status: HealthResponseDto['status'],
    database: HealthResponseDto['database'],
  ): HealthResponseDto {
    return {
      status,
      database,
      service: 'nexora-api',
      timestamp: new Date().toISOString(),
    };
  }
}
