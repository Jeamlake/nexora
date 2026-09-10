import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'residente@nexora.local' })
  @IsEmail()
  @MaxLength(254)
  public email!: string;

  @ApiProperty({ example: 'Nexora2026!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  public password!: string;
}
