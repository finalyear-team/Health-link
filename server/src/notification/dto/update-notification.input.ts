import { notificationStatus } from '@prisma/client';
import { CreateNotificationInput } from './create-notification.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput extends PartialType(CreateNotificationInput) {
  @Field()
  NotificationID: string;
  @Field()
  ReadAt?: Date
  @Field()
  Status?: notificationStatus
}
