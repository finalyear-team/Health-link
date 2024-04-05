import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}
  
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
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action  a #${id} user`;
  }
}
