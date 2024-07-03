import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Schedule } from './entities/schedule.entity';

@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) { }


  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('CreateSchedule')
  async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    console.log(createScheduleInput)
    const input = new CreateScheduleInput(createScheduleInput)
    console.log(input)
    const schedule = await this.scheduleService.createSchedule(input)
    return schedule
  }

  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('UpdateSchedule')
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    console.log(updateScheduleInput)
    const input = new UpdateScheduleInput(updateScheduleInput)
    console.log(input)
    const schedule = await this.scheduleService.updateSchedule(input)
    return schedule
  }


  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.DOCTOR)
  @Mutation('CreateEmergencySchedule')
  async createEmergencySchedule(@Args("emergencyScheduleInput") emergencyScheduleInput: EmergencyScheduleInput) {
    const input = new EmergencyScheduleInput(emergencyScheduleInput)
    const schedule = await this.scheduleService.createEmergencySchedule(input)
    return schedule
  }


  // updates the emergency schedule status to unavailable when the current day ended
  @Cron("59 23 * * *")
  async handleCron() {
    console.log("come on man")
    await this.scheduleService.autoEmergencyScheduleUpdate();
  }


  @Query('Schedules')
  async findAll(@Args("DoctorID") DoctorID: string) {
    console.log('doctors schedules')
    const scheduels = await this.scheduleService.schedules(DoctorID)
    return scheduels
  }


  @Query('EmergencySchedules')
  async findEmergencySchedules() {
    console.log("emergency schedules")
    const emergencySchedules = await this.scheduleService.emergencySchedules()
    return emergencySchedules
  }

  @Query('GetScheduleByDate')
  async GetScheduleByDate(@Args("DoctorID") DoctorID: string, @Args("Date") Date: string) {
    const schedule = await this.scheduleService.getScheduleByDate(DoctorID, Date)
    return schedule
  }




  @Mutation('RemoveSchedule')
  remove(@Args('id') id: number) {
  }
}
