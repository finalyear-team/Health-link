import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}


 // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('CreateSchedule')
 async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    const schedule=await this.scheduleService.createSchedule(createScheduleInput)
    return schedule
  }

   // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('UpdateSchedule')
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
      const schedule=await this.scheduleService.updateSchedule(updateScheduleInput)
      return schedule
  }
 

  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
 @Mutation('CreateEmergencySchedule')
  async createEmergencySchedule(@Args("emergencyScheduleInput") emergencyScheduleInput:EmergencyScheduleInput) {
    console.log(emergencyScheduleInput)
      const schedule=await this.scheduleService.createEmergencySchedule(emergencyScheduleInput)
      return schedule
  }


  @Query('Schedules')
  async findAll(@Args("DoctorID") DoctorID:string) {
    const scheduels= await this.scheduleService.schedules(DoctorID)
    return scheduels
  }

  

  @Query('EmergencySchedules')
  async findEmergencySchedules() {
    const emergencySchedules=await this.scheduleService.EmergencySchedules()
    console.log(emergencySchedules)
    return emergencySchedules
  }



  @Query("LatestSlotForEmergency")
  async findEmergencySlot(@Args("DoctorID") DoctorID:string){
      const latestSlot=await this.scheduleService.findNextEmergencySlot(DoctorID)
      console.log(latestSlot)
      return latestSlot
  }

  

  @Mutation('RemoveSchedule')
  remove(@Args('id') id: number) {
  }
}
