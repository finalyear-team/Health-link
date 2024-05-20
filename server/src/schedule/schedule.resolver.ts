import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation('CreateSchedule')
 async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    const schedule=await this.scheduleService.createSchedule(createScheduleInput)
    return schedule
  }
  @Mutation('UpdateSchedule')
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
      const schedule=await this.scheduleService.updateSchedule(updateScheduleInput)
      return schedule
  }

 @Mutation('CreateEmergencySchedule')
  async createEmergencySchedule(emergencyScheduleInput:EmergencyScheduleInput) {
      const schedule=await this.scheduleService.createEmergencySchedule(emergencyScheduleInput)
      return schedule
  }



  @Query('Schedules')
  async findAll() {
  }

  @Query('EmergencySchedules')
  async findOne() {
  }

  

  @Mutation('removeSchedule')
  remove(@Args('id') id: number) {
  }
}
