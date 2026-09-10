import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ enum: ['ok', 'error'], example: 'ok' })
  public status!: 'ok' | 'error';

  @ApiProperty({ example: 'nexora-api' })
  public service!: 'nexora-api';

  @ApiProperty({ example: '2026-09-08T21:00:00.000Z', format: 'date-time' })
  public timestamp!: string;

  @ApiProperty({ enum: ['up', 'down'], example: 'up' })
  public database!: 'up' | 'down';
}
