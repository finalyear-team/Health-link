import {clerkClient} from "@clerk/clerk-sdk-node";
import { Injectable,CanActivate,ExecutionContext, SetMetadata, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { JwtTokenValidator } from "src/utils/TokenValidator";
import { UserType } from "src/utils/types";

export const UserRoles=(...roles:UserType[])=>SetMetadata("roles",roles)


@Injectable()
export class RoleGuard implements CanActivate{
    isTokenExpired(exp:number) {
        return (Date.now()/1000)>exp
      }

      constructor(private readonly jwtvalidator:JwtTokenValidator){ }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {       
        const {req}=GqlExecutionContext.create(context).getContext()       
        const session_token = req.cookies["__session"]
        const token = req.headers.authorization?.split(' ')[1]
        if (!session_token && !token) {
        return false
      }
      try {
        if (session_token) {
        const {sid,sub,exp,role} = this.jwtvalidator.validateToken(session_token)
        const unsafeMetadata=await (await clerkClient.users.getUser(sub)).unsafeMetadata
        console.log(unsafeMetadata)
        if(!unsafeMetadata)
           return false
      }
      else {
        const {sid,sub,exp} = this.jwtvalidator.validateToken(session_token)
        const unsafeMetadata=await (await clerkClient.users.getUser(sub)).unsafeMetadata
        console.log(unsafeMetadata)
        if(!unsafeMetadata)
           return false   }      
    } catch (error) {
      console.log(error)
      return false
    }
}
}