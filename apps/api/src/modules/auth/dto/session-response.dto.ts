import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class SessionUserDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'María Residente' })
  public displayName!: string;

  @ApiProperty({ example: 'residente@nexora.local' })
  public email!: string;

  @ApiProperty({ enum: UserRole })
  public role!: UserRole;
}

export class SessionResponseDto {
  @ApiProperty()
  public accessToken!: string;

  @ApiProperty()
  public refreshToken!: string;

  @ApiProperty({
    example: 900,
    description: 'Vigencia del access token en segundos',
  })
  public expiresIn!: number;

  @ApiProperty({ type: SessionUserDto })
  public user!: SessionUserDto;
}

export class LogoutResponseDto {
  @ApiProperty({ example: true })
  public success!: true;
}
