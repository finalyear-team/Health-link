import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) { }



  @Query('notificationsForUser')
  findAll(@Args('UserID', { type: () => String }) UserID: string) {
    return this.notificationService.findAllForUser(UserID);
  }

  @Query('notification')
  findOne(@Args('NotificationID', { type: () => String }) NotificationID: string) {
    return this.notificationService.findOne(NotificationID);
  }

  @Mutation("updateNotification")
  updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
    return this.notificationService.update(updateNotificationInput);
  }

  @Mutation("removeNotification")
  removeNotification(@Args('NotificationID', { type: () => String }) NotificationID: string) {
    return this.notificationService.remove(NotificationID);
  }
}
