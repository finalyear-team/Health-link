import { Injectable, NestMiddleware, NestModule, SetMetadata } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";


export const useClerkAuth = () => SetMetadata("useClerkAuth", true)


@Injectable()
export class ClerkMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction) {
        ClerkExpressWithAuth()(req, res, () => {
            next()
        });
    }
}




