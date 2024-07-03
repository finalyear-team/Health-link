import { InputType, Int, Field } from '@nestjs/graphql';
import { notificationType } from '@prisma/client';

@InputType()
export class CreateNotificationInput {
  @Field()
  UserID: string;
  @Field()
  Message: string;
  @Field()
  NotificationType: notificationType;

}
