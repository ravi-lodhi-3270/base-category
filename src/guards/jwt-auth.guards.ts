import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { handleReq } from './request-hendler.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest = handleReq;
}
