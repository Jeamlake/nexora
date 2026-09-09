import { Controller, Get } from '@nestjs/common';
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
  public getStatus(): HealthResponseDto {
    return this.healthService.getStatus();
  }
}
