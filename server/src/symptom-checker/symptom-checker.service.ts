import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
const model_url=``

@Injectable()
export class SymptomCheckerService {   

    constructor(private readonly prisma:PrismaService){      

    }

    async Predict(symptom:string){
        try {
            
        } catch (error) {
            
        }

    }
}
