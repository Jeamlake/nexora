export type UserRole =
  | 'ADMIN_DIRECTIVE'
  | 'RESIDENT'
  | 'SECURITY_GUARD';

export interface User {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}
