import type { EmergencyContact } from './EmergencyContact';

export type ResidentStatus = 'ACTIVE' | 'INACTIVE';

export const MAX_EMERGENCY_CONTACTS = 3;

export interface ResidentProps {
  id: string;
  userId: string;
  unitId: string;
  status: ResidentStatus;
  emergencyContacts: readonly EmergencyContact[];
}

export class Resident {
  public readonly id: string;
  public readonly userId: string;
  public readonly unitId: string;
  public readonly status: ResidentStatus;
  public readonly emergencyContacts: readonly EmergencyContact[];

  public constructor(props: ResidentProps) {
    validateEmergencyContacts(props.emergencyContacts);

    this.id = props.id;
    this.userId = props.userId;
    this.unitId = props.unitId;
    this.status = props.status;
    this.emergencyContacts = Object.freeze([...props.emergencyContacts]);
  }
}

export function validateEmergencyContacts(
  contacts: readonly EmergencyContact[],
): void {
  if (contacts.length > MAX_EMERGENCY_CONTACTS) {
    throw new RangeError(
      `A resident can register at most ${MAX_EMERGENCY_CONTACTS} emergency contacts.`,
    );
  }
}
