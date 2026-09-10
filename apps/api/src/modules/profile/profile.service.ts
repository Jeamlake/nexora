import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service.js';
import type { ProfileResponseDto } from './dto/profile-response.dto.js';

const profileSelection = {
  user: true,
  unit: { include: { condominium: true } },
  emergencyContacts: { orderBy: { name: 'asc' as const } },
} satisfies Prisma.ResidentInclude;

type ResidentProfileRecord = Prisma.ResidentGetPayload<{
  include: typeof profileSelection;
}>;

@Injectable()
export class ProfileService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findMine(userId: string): Promise<ProfileResponseDto> {
    const resident = await this.prisma.resident.findUnique({
      where: { userId },
      include: profileSelection,
    });
    if (!resident) {
      throw new NotFoundException(
        'El usuario no tiene un perfil de residente.',
      );
    }
    return this.toResponse(resident);
  }

  public async findAllResidents(): Promise<ProfileResponseDto[]> {
    const residents = await this.prisma.resident.findMany({
      include: profileSelection,
      orderBy: { user: { displayName: 'asc' } },
    });
    return residents.map((resident) => this.toResponse(resident));
  }

  private toResponse(resident: ResidentProfileRecord): ProfileResponseDto {
    return {
      user: {
        id: resident.user.id,
        displayName: resident.user.displayName,
        email: resident.user.email,
        phone: resident.user.phone,
        role: resident.user.role,
        isActive: resident.user.isActive,
        createdAt: resident.user.createdAt.toISOString(),
        lastLoginAt: resident.user.lastLoginAt?.toISOString() ?? null,
      },
      residentId: resident.id,
      status: resident.status,
      condominium: {
        id: resident.unit.condominium.id,
        name: resident.unit.condominium.name,
      },
      unit: {
        id: resident.unit.id,
        code: resident.unit.code,
        tower: resident.unit.tower,
        pavilion: resident.unit.pavilion,
        block: resident.unit.block,
        floor: resident.unit.floor,
        isActive: resident.unit.isActive,
      },
      emergencyContacts: resident.emergencyContacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        relationship: contact.relationship,
      })),
    };
  }
}
