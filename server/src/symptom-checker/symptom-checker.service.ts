import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SymptomCheckerService {

    constructor(private readonly prisma:PrismaService){
        
    }
}
