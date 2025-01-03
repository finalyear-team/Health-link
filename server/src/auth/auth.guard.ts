import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()


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
      console.log(req)
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