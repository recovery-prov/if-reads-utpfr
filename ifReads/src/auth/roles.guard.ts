import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum.js';
import { ROLES_KEY } from './roles.decorator.js';
import { JwtPayload } from './jwt-payload.interface.js';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const userRole = request.user?.role;
    const allowed = requiredRoles.includes(userRole);

    this.logger.log(
      `Verificação de role — usuário: ${request.user?.sub} | role: ${userRole} | requerida: [${requiredRoles.join(', ')}] | acesso: ${allowed ? 'PERMITIDO' : 'NEGADO'}`,
    );

    return allowed;
  }
}
