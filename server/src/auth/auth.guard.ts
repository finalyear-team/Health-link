import {clerkClient} from "@clerk/clerk-sdk-node";
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken"


@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  isTokenExpired(exp:number) {
    return (Date.now()/1000)>exp
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
        const {sid,sub,exp} = this.jwt.decode(session_token) as jwt.JwtPayload
        if(this.isTokenExpired(exp))
          throw new HttpException("token expired",HttpStatus.UNAUTHORIZED)
        const user=await clerkClient.users.getUser(sub)
        if(!user)
           return false
      }
      else {
        const {sid,sub,exp} = jwt.decode(session_token) as jwt.JwtPayload
        if(this.isTokenExpired)
          throw new HttpException("token expired",HttpStatus.UNAUTHORIZED)
        const user=await clerkClient.users.getUser(sub)
        if(!user)
           return false       
      }      
      return true
    } catch (error) {
      console.log(error)
      return false
    }

  }
}