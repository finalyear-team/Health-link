import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) { }



  @Query('UserNotification')
  findAll(@Args('UserID') UserID: string) {

    return this.notificationService.findAllForUser(UserID);
  }

  @Query('GetNotification')
  findOne(@Args('NotificationID') NotificationID: string) {
    return this.notificationService.findOne(NotificationID);
  }

  @Mutation("updateNotification")
  updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
    console.log(updateNotificationInput)
    // return this.notificationService.update(updateNotificationInput);
  }

  @Mutation("removeNotification")
  removeNotification(@Args('NotificationID', { type: () => String }) NotificationID: string) {
    return this.notificationService.remove(NotificationID);
  }
}
