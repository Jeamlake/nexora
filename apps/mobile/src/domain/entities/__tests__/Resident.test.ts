import type { EmergencyContact } from '../EmergencyContact';
import { MAX_EMERGENCY_CONTACTS, Resident } from '../Resident';

function buildContact(index: number): EmergencyContact {
  return {
    id: `contact-${index}`,
    name: `Contact ${index}`,
    phone: `555-000${index}`,
    relationship: 'Family',
  };
}

function buildResident(emergencyContacts: EmergencyContact[]): Resident {
  return new Resident({
    id: 'resident-1',
    userId: 'user-1',
    unitId: 'unit-1',
    status: 'ACTIVE',
    emergencyContacts,
  });
}

describe('Resident', () => {
  it('accepts up to three emergency contacts', () => {
    const contacts = Array.from(
      { length: MAX_EMERGENCY_CONTACTS },
      (_, index) => buildContact(index),
    );

    expect(buildResident(contacts).emergencyContacts).toHaveLength(
      MAX_EMERGENCY_CONTACTS,
    );
  });

  it('rejects more than three emergency contacts', () => {
    const contacts = Array.from(
      { length: MAX_EMERGENCY_CONTACTS + 1 },
      (_, index) => buildContact(index),
    );

    expect(() => buildResident(contacts)).toThrow(RangeError);
  });

  it('keeps its own immutable contact collection', () => {
    const contacts = [buildContact(1)];
    const resident = buildResident(contacts);

    contacts.push(buildContact(2));

    expect(resident.emergencyContacts).toHaveLength(1);
    expect(Object.isFrozen(resident.emergencyContacts)).toBe(true);
  });
});
