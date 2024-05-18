import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';
import { DoctorDetails, Prisma, UserType, Users } from '@prisma/client';
import { SuspendType } from 'src/utils/types';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async RegisterUser(RegisterInput: UserDetailsInput) {
    try {
      const user = await this.prisma.users.create({
        data: {
          ...RegisterInput,
          Status: "active"
        }
      })
      return user
    } catch (error) {
      throw error
    }
  }


  async DoctorRegister(DoctorRegisterInput: DoctorDetailInput) {
    const { UserDetails, ...others } = DoctorRegisterInput

    try {
      const { DoctorDetails, ...UsersDetail } = await this.prisma.users.create({
        data: {
          ...UserDetails,
          Status: "active",
          DoctorDetails: {
            create: {
              ...others
            }
          }

        },
        include: {
          DoctorDetails: true
        }
      })
      return { ...UsersDetail, ...DoctorDetails }
    } catch (error) {
      console.log(error)
      throw error

    }
  }


  async getUsers(): Promise<Users[]> {
    try {
      const Users = await this.prisma.users.findMany({
        include: {
          DoctorDetails: true
        }
      })
      console.log(Users)
      return Users

    } catch (error) {
      throw error

    }
  }


  async getUserDetails(Id: string) {
    try {
      const User = await this.prisma.users.findUnique({
        where: {
          UserID: Id
        }, include: {
          DoctorDetails: true
        }
      })
      console.log(User)
      return User
    } catch (error) {
      throw error

    } finally {
      this.prisma.$disconnect()
    }
  }


  async searchUsers(searchQuery: string): Promise<Users[]> {
    try {
      const Users = await this.prisma.users.findMany({
        where: {
          OR: [
            { UserID: { contains: searchQuery } },
            { Username: { contains: searchQuery } },
            { Email: { contains: searchQuery } },
            { PhoneNumber: { contains: searchQuery } },
            { Address: { contains: searchQuery } },
          ]
        },
        include: {
          DoctorDetails: true
        }
      })
      console.log(Users)
      return Users
    } catch (error) {
      throw error
    }
  }

  async searchDoctors(searchQuery: string): Promise<Users[]> {
    try {
      const users = await this.prisma.users.findMany({
        where: {
          AND: [
            { Role: "doctor" },
            {
              OR: [
                {
                  OR: [
                    { FirstName: { contains: searchQuery } },
                    { LastName: { contains: searchQuery } },
                    { Address: { contains: searchQuery } },
                  ]
                },
                {
                  DoctorDetails: {
                    Speciality: { contains: searchQuery }

                  }
                }
              ]
            }
          ]
        },
        include: {
          DoctorDetails: true
        }
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(updateUserInput: UpdateUserInput) {
    const { UserID, DoctorDetails: DoctorUpdateDetails, ...otherUserDetails } = updateUserInput
    const FirstName = otherUserDetails?.FirstName?.toLowerCase()
    const LastName = otherUserDetails?.LastName?.toLowerCase()
    const Speciality = DoctorUpdateDetails?.Speciality?.toLowerCase()
    try {
      const { DoctorDetails, ...Userdata } = await this.prisma.users.update({
        where: {
          UserID
        },
        data: {
          FirstName,
          LastName,
          ...otherUserDetails,
          UpdatedAt: new Date(Date.now()),
          DoctorDetails: {
            update: {
              Speciality,
              ...DoctorUpdateDetails,
              EducationalBackground: JSON.stringify(DoctorUpdateDetails?.EducationalBackground)
            }
          }
        },
        include: {
          DoctorDetails: true
        }
      })
      return {...DoctorDetails,...Userdata }
    } catch (error) {
      throw error
    }
  }

  async suspendUser(UserID:string,suspendType:SuspendType){
    const Status=suspendType=="suspend"?"suspended":"active"
    try {
      const User=await this.prisma.users.update({
        where:{
          UserID        }
        ,data:{
          Status
        },
        include:{
          DoctorDetails:true
        }
      },     
      
    )
    console.log(User)
      return User
      
    } catch (error) {
      throw error
      
    }
  }

}
