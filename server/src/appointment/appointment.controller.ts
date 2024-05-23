import { Controller, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService:AppointmentService){}

    @Get("/get-appointment")
    async getAppointment(){
        console.log("come ")
        // return await this.appointmentService.checkIfSelectedDateIsAvailable()
    }
}
