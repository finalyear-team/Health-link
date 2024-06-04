import { Injectable } from '@nestjs/common';
import { CreateDoctorReviewInput } from './dto/create-doctor-review.input';
import { UpdateDoctorReviewInput } from './dto/update-doctor-review.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorReviewService {
  constructor(private readonly prisma:PrismaService){

  }
 async create(createDoctorReviewInput: CreateDoctorReviewInput) {
     try {
      const review=await this.prisma.doctorReviews.create({
        data:{...createDoctorReviewInput          
        }
      })
      return review
        
     } catch (error) {
      console.log(error)
      throw error
      
     }
  }

 async getDoctorReviews(DoctorID:string) {
  try {
    const reviews=await this.prisma.doctorReviews.findMany({
      where:{
        DoctorID
      }
    })
    return reviews
    
  } catch (error) {
    console.log(error)
    throw error
    
  }
    
  }

 async getReview(ReviewID: string) {
   try {
    const review =await this.prisma.doctorReviews.findUnique({
      where:{
        ReviewID
      }
    })
    return review
   } catch (error) {
    console.log(error)
    throw error
    
   }
  }

 async update(ReviewID: string, updateDoctorReviewInput: UpdateDoctorReviewInput) {
    try {
      const review=await this.prisma.doctorReviews.update({
        where:{
        ReviewID},
        data:updateDoctorReviewInput
      })
      return review
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

 async removeReview(ReviewID: string) {
    try {
      const review=await this.prisma.doctorReviews.delete({
        where:{
          ReviewID
        }
      })
      return  review
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
}
