import clerkClient from "@clerk/clerk-sdk-node";
import { Injectable,CanActivate,ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class ClerkAuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request=context.switchToHttp().getRequest()
        try {
            
        } catch (error) {
            return false
            
        }
         
          return true
    }
}