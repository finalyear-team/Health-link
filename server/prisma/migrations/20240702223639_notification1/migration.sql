-- AlterTable
ALTER TABLE `Notification` MODIFY `NotificationType` ENUM('newAppointment', 'cancelAppointment', 'acceptAppointment', 'newChat', 'newVideoCall', 'newPost', 'newForumQuestion', 'newForumAnswer', 'newComment') NOT NULL;
