import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto.js';
import { HealthService } from './health.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Comprueba la disponibilidad básica de la API' })
  @ApiOkResponse({ type: HealthResponseDto })
  public async getStatus(
    @Res({ passthrough: true }) response: Response,
  ): Promise<HealthResponseDto> {
    const status = await this.healthService.getStatus();
    response.status(status.status === 'ok' ? 200 : 503);
    return status;
  }
}
