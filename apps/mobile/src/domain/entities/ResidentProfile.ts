import type { Resident } from "./Resident";
import type { Unit } from "./Unit";
import type { User } from "./User";

export interface Condominium {
  id: string;
  name: string;
}

export interface ResidentProfile {
  user: User;
  resident: Resident;
  condominium: Condominium;
  unit: Unit;
}
