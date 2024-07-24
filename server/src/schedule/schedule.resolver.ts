import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { CreateScheduleInput, EmergencyScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Schedule } from './entities/schedule.entity';
import { date } from 'zod';
import { Weekday } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { parseDate } from 'src/utils/parseDate';
import { addHours, format } from 'date-fns';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Resolver('Schedule')
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService, private readonly prisma: PrismaService
  ) { }


  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('CreateSchedule')
  async createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput, @Args("unselectedDays") unselectedDays: Weekday[]) {
    const input = new CreateScheduleInput(createScheduleInput)
    const schedule = await this.scheduleService.createOrUpdateSchedule(input, unselectedDays)
    return schedule
  }

  // @UseGuards(RoleGuard)
  // @UserRoles(UserType.ADMIN)
  @Mutation('UpdateSchedule')
  async updateSchedule(@Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput) {
    const input = new UpdateScheduleInput(updateScheduleInput)
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
    await this.scheduleService.autoEmergencyScheduleUpdate();
  }


  @Query('Schedules')
  async findAll(@Args("DoctorID") DoctorID: string) {
    console.log(DoctorID)
    const scheduels = await this.scheduleService.schedules(DoctorID)
    return scheduels
  }


  @Query('EmergencySchedules')
  async findEmergencySchedules() {
    const emergencySchedules = await this.scheduleService.emergencySchedules()
    return emergencySchedules
  }

  @Query('GetScheduleByDate')
  async GetScheduleByDate(@Args("DoctorID") DoctorID: string, @Args("Date") date: string) {
    const schedule = await this.scheduleService.getScheduleByDate(DoctorID, date)
    console.log()
    const bookedAppointments = await this.prisma.appointments.findMany({
      where: {
        DoctorID,
        AppointmentDate: {
          equals: new Date(format(parseDate(date), "yyyy-MM-dd"))
        },
        Status: "booked"
      }

    })


    console.log(bookedAppointments.map((appoint) => ({ startTime: appoint.AppointmentTime, endTime: addHours(appoint.AppointmentTime, appoint.Duration) })))

    return {
      Schedule: schedule,
      BookedTimes: bookedAppointments.map((appoint) => ({ StartTime: appoint.AppointmentTime, EndTime: addHours(appoint.AppointmentTime, appoint.Duration) }))
    }
  }




  @Mutation('RemoveSchedule')
  remove(@Args('id') id: number) {
  }
}
