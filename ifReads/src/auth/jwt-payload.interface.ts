import { Role } from './role.enum.js';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
