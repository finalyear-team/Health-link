import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

async RegisterUser(RegisterInput:UserDetailsInput){
  try {
    const user=await this.prisma.users.create({
      data:{
        ...RegisterInput,
        Status:"active"
      }      
    })  
    return user    
  } catch (error) {
    throw error    
  }
}


async DoctorRegister(DoctorRegisterInput:DoctorDetailInput){
  const {UserDetails,...others}=DoctorRegisterInput
  try {
      const {DoctorDetails,...UsersDetail}=await this.prisma.users.create({
        data:{
          ...UserDetails,
          Status:"active",
          DoctorDetails:{
            create:{
              ...others}
            }          
         },
         include:{
          DoctorDetails:true
         }
      })
      return {User:UsersDetail,...DoctorDetails}
    } catch (error) {
      throw error
      
    }
}
 async getUserDetails(Id:string){
    try {
      const {UserID,...others}=await this.prisma.users.findUnique({where:{
        UserID:Id
      }})
      return others
      
    } catch (error) {
      throw error
      
    }finally{
      this.prisma.$disconnect()
    }
  }
  
  async removeUser(Id:string){
    try {
    
    } catch (error) {
      
    }
  }
  
}
