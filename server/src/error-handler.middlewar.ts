import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.url.includes('/graphql')) {
      this.handleGraphQLErrors(req, res, next);
    } else {
      this.handleRestAPIErrors(req, res, next);
    }
  }

  private handleGraphQLErrors(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    res.send = function (body): any {
      if (body?.errors) {
        body.errors.forEach((error) => {
          console.error('GraphQL Error:', error.message);
        });
      }
      originalSend.apply(res, arguments);
    };
    next();
  }

  private handleRestAPIErrors(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (body): any {
      if (body instanceof HttpException) {
        const exception: HttpException = body;
        res.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message: exception.message,
        });
      } else if (body?.message && body?.statusCode) {
        res.status(body.statusCode).json({
          statusCode: body.statusCode,
          message: body.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
      originalJson.apply(res, arguments);
    };
    next();
  }
}
