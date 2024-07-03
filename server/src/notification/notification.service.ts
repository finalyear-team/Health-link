import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNotificationInput: CreateNotificationInput) {
    try {
      console.log(createNotificationInput)
      const notification = await this.prisma.notification.create({
        data: createNotificationInput
      });
      return notification;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async findAllForUser(UserID: string) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { UserID },
      });
      return notifications;
    } catch (error) {
      throw error;
    }
  }

  async findOne(NotificationID: string) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { NotificationID },
      });
      return notification;
    } catch (error) {
      throw error;
    }
  }

  async update(updateNotificationInput: UpdateNotificationInput) {
    const { NotificationID, ...others } = updateNotificationInput
    try {
      const notification = await this.prisma.notification.update({
        where: { NotificationID: updateNotificationInput.NotificationID },
        data: { ...others },
      });
      return notification;
    } catch (error) {
      throw error;
    }
  }

  async remove(NotificationID: string) {
    try {
      const notification = await this.prisma.notification.delete({
        where: { NotificationID },
      });
      return notification;
    } catch (error) {
      throw error;
    }
  }
}
