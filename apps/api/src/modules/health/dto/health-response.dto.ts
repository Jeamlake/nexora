import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  public status!: 'ok';

  @ApiProperty({ example: 'nexora-api' })
  public service!: 'nexora-api';

  @ApiProperty({ example: '2026-09-08T21:00:00.000Z', format: 'date-time' })
  public timestamp!: string;
}
