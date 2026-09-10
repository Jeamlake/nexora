import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token opaco de renovación entregado por la API',
  })
  @IsString()
  @MinLength(32)
  public refreshToken!: string;
}
