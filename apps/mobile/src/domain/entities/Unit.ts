export interface UnitLocation {
  tower?: string;
  pavilion?: string;
  block?: string;
  floor?: string;
}

export interface Unit {
  id: string;
  code: string;
  location: UnitLocation;
  isActive: boolean;
}
