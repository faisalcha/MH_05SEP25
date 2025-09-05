import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth) throw new UnauthorizedException('Missing Authorization');
    // For dev: accept any non-empty token and map to a dummy user in DB in controllers.
    req.userPhone = '+920000000000';
    return true;
  }
}
