import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class JwtTokenValidator{
    constructor(private readonly jwt:JwtService){  }


 isTokenExpired(exp:number){
    return (Date.now()/1000)>exp
    }
  validateToken(token:string){
    const decode  = this.jwt.decode(token) 
    if(!decode||this.isTokenExpired(decode.exp))
      throw new HttpException("token expired",HttpStatus.UNAUTHORIZED)
    return decode
 }
     
  
}
