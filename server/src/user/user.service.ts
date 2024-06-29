import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDetailInput, UserDetailsInput } from './dto/create-user.input';
import { DoctorDetails, Prisma, UserType, Users } from '@prisma/client';
import { SuspendType } from 'src/utils/types';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async existingFollow(FollowerID: string, FollowingID: string) {
    try {
      const follower = await this.prisma.followers.findFirst({
        where: {
          AND: [{
            FollowerID
          }, {
            FollowingID
          }
          ]
        },
      });

      return follower
    } catch (error) {
      throw error

    }

  }

  async countFollowersAndFollowing(UserID: string) {
    try {
      const followers = await this.prisma.followers.count({
        where: {
          FollowingID: UserID
        }
      })
      const following = await this.prisma.followers.count({
        where: {
          FollowerID: UserID
        }
      })
      return { Followers: followers, Following: following }
    } catch (error) {
      throw error
    }
  }


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
      console.log(error)
      throw new HttpException("faild to register ", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



  async DoctorRegister(DoctorRegisterInput: DoctorDetailInput) {
    console.log(DoctorRegisterInput)
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
      console.log("success")
      return { ...UsersDetail, ...DoctorDetails }
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to register  ", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async getUsers(): Promise<Users[]> {
    try {
      const Users = await this.prisma.users.findMany({
        include: {
          DoctorDetails: true
        }
      })
      return Users
    } catch (error) {
      throw new HttpException("faild to fetch users ", HttpStatus.INTERNAL_SERVER_ERROR)
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
      return User
    } catch (error) {
      throw new HttpException("faild to fetch details ", HttpStatus.INTERNAL_SERVER_ERROR)

    } finally {
      this.prisma.$disconnect()
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          Email: email
        }
      })
      return user
    } catch (error) {

    }
  }

  async searchUsers(searchQuery: string): Promise<Users[]> {
    try {
      const Users = await this.prisma.users.findMany({
        where: {
          OR: [
            { UserID: { contains: searchQuery } },
            { FirstName: { contains: searchQuery } },
            { LastName: { contains: searchQuery } },
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
      return Promise.all(Users.map((user) => ({ ...user.DoctorDetails, ...user })))
    } catch (error) {
      throw error
    }
  }


  async follow(FollowerID: string, FollowingID: string) {
    try {
      if (await this.existingFollow(FollowerID, FollowingID))
        throw new HttpException("You're Already following ", HttpStatus.BAD_REQUEST)
      const follow = await this.prisma.followers.create({
        data: {
          FollowerID,
          FollowingID
        },
        include: {
          Follower: true,
          Following: true
        }
      })
      return follow.Following
    } catch (error) {
      throw error

    }

  }

  async unfollow(FollowerID: string, FollowingID: string) {
    try {
      if (!await this.existingFollow(FollowerID, FollowingID))
        throw new HttpException(`You're not  following`, HttpStatus.BAD_REQUEST)
      const { FollowersID } = await this.existingFollow(FollowerID, FollowingID)
      const unfollow = await this.prisma.followers.delete({
        where: {
          FollowersID,
          FollowerID,
          FollowingID
        },


      })
      return unfollow
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to unfollow", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }


  async getDoctors() {
    try {
      const doctors = await this.prisma.users.findMany({
        where: {
          Role: "doctor"
        },
        include: {
          DoctorDetails: true,
        },

      })

      const Followers = await Promise.all(doctors.map(async (doctor) => this.countFollowersAndFollowing(doctor.UserID)))
      return Promise.all(doctors.map((doctor, i) => ({ ...doctor.DoctorDetails, ...doctor, ...Followers[i] })))

    } catch (error) {
      console.log(error)
      throw new HttpException("faild to fetch doctors", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async getFollowers(UserID: string) {
    try {
      const followers = await this.prisma.users.findMany({
        where: {
          UserID,
          FollowersFollowers: {
            some: {
              FollowingID: UserID
            }
          }
        },
      })
      return followers
    } catch (error) {
      throw new HttpException("faild to fetch followers", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFollowing(UserID: string) {
    try {
      const following = await this.prisma.users.findMany({
        where: {
          UserID,
          FollowersFollowing: {
            some: {
              FollowerID: UserID
            }
          }
        },
      })
      return following

    } catch (error) {
      throw new HttpException("faild to fetch followings", HttpStatus.INTERNAL_SERVER_ERROR)


    }
  }

  async searchDoctors(searchQuery: string): Promise<Users[]> {
    try {
      const Users = await this.prisma.users.findMany({
        where: {
          Role: "doctor",
          OR: [
            {
              OR: [
                { FirstName: { contains: searchQuery } },
                { Username: { contains: searchQuery } },
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
        },
        include: {
          DoctorDetails: true
        }
      });
      return Promise.all(Users.map((user) => ({ ...user, ...user?.DoctorDetails })));
    } catch (error) {
      throw new HttpException("faild to fetch doctors", HttpStatus.INTERNAL_SERVER_ERROR)
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
      return { ...DoctorDetails, ...Userdata }
    } catch (error) {
      throw new HttpException("faild to update ", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async suspendUser(UserID: string, suspendType: SuspendType) {
    const Status = suspendType == "suspend" ? "suspended" : "active"
    try {
      const User = await this.prisma.users.update({
        where: {
          UserID
        }
        , data: {
          Status
        },
        include: {
          DoctorDetails: true
        }
      },

      )
      return User

    } catch (error) {
      throw new HttpException("faild to suspend user ", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async VerifyLicenseNumber() {


  }

}
