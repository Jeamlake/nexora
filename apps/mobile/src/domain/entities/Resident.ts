import type { EmergencyContact } from './EmergencyContact';

export type ResidentStatus = 'ACTIVE' | 'INACTIVE';

export const MAX_EMERGENCY_CONTACTS = 3;

export interface Resident {
  id: string;
  userId: string;
  unitId: string;
  status: ResidentStatus;
  emergencyContacts: readonly EmergencyContact[];
}

export function validateEmergencyContacts(
  contacts: readonly EmergencyContact[],
): void {
  if (contacts.length > MAX_EMERGENCY_CONTACTS) {
    throw new Error(
      `A resident can register at most ${MAX_EMERGENCY_CONTACTS} emergency contacts.`,
    );
  }
}
