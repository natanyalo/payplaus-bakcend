import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const result = this.jwtService.verify(token);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractJwtFromRequest(request: Request): string | undefined {
    const [type, token] = request?.headers['authorization']?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
