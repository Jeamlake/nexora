import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResidentStatus, UserRole } from '@prisma/client';

export class ProfileUserDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'María Residente' })
  public displayName!: string;

  @ApiProperty({ example: 'residente@nexora.local' })
  public email!: string;

  @ApiPropertyOptional({ example: '+51 900 000 101' })
  public phone!: string | null;

  @ApiProperty({ enum: UserRole })
  public role!: UserRole;

  @ApiProperty({ example: true })
  public isActive!: boolean;

  @ApiProperty({ format: 'date-time' })
  public createdAt!: string;

  @ApiPropertyOptional({ format: 'date-time' })
  public lastLoginAt!: string | null;
}

export class CondominiumDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'Condominio Los Jardines' })
  public name!: string;
}

export class UnitDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'A-301' })
  public code!: string;

  @ApiPropertyOptional({ example: 'Torre A' })
  public tower!: string | null;

  @ApiPropertyOptional({ example: 'Pabellón norte' })
  public pavilion!: string | null;

  @ApiPropertyOptional({ example: 'Manzana 1' })
  public block!: string | null;

  @ApiPropertyOptional({ example: '3' })
  public floor!: string | null;

  @ApiProperty({ example: true })
  public isActive!: boolean;
}

export class EmergencyContactDto {
  @ApiProperty({ format: 'uuid' })
  public id!: string;

  @ApiProperty({ example: 'Carlos Ramírez' })
  public name!: string;

  @ApiProperty({ example: '+51 900 000 201' })
  public phone!: string;

  @ApiProperty({ example: 'Hermano' })
  public relationship!: string;
}

export class ProfileResponseDto {
  @ApiProperty({ type: ProfileUserDto })
  public user!: ProfileUserDto;

  @ApiProperty({ format: 'uuid' })
  public residentId!: string;

  @ApiProperty({ enum: ResidentStatus })
  public status!: ResidentStatus;

  @ApiProperty({ type: CondominiumDto })
  public condominium!: CondominiumDto;

  @ApiProperty({ type: UnitDto })
  public unit!: UnitDto;

  @ApiProperty({ type: [EmergencyContactDto], maxItems: 3 })
  public emergencyContacts!: EmergencyContactDto[];
}
