import { clerkClient } from "@clerk/clerk-sdk-node";
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from "jsonwebtoken"
import { Observable } from "rxjs";


@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  isTokenExpired(exp: number) {
    return (Date.now() / 1000) > exp
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const session_token = request.cookies["__session"]
    const token = request.headers.authorization?.split(' ')[1]
    if (!session_token && !token) {
      return false
    }
    try {
      if (session_token) {
        const { sid, sub, exp } = this.jwt.decode(session_token) as jwt.JwtPayload
        if (this.isTokenExpired(exp))
          throw new HttpException("token expired", HttpStatus.UNAUTHORIZED)
        const user = await clerkClient.users.getUser(sub)
        if (!user)
          return false
      }
      else {
        const { sid, sub, exp } = jwt.decode(session_token) as jwt.JwtPayload
        if (this.isTokenExpired)
          throw new HttpException("token expired", HttpStatus.UNAUTHORIZED)
        const user = await clerkClient.users.getUser(sub)
        if (!user)
          return false
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }

  }
}



@Injectable() @Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const isGraphql = !!ctx.getContext().req;

    // If it's a GraphQL request, extract the request object from the context
    if (isGraphql) {
      const { req } = ctx.getContext();
      return super.canActivate(new ExecutionContextHost([req]));
    }

    // Otherwise, proceed as usual for HTTP requests
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}