/*
  Warnings:

  - Added the required column `NotificationType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `NotificationType` ENUM('newAppointment', 'cancelAppointment', 'newChat', 'newVideoCall', 'newPost', 'newForumQuestion', 'newForumAnswer', 'newComment') NOT NULL,
    ADD COLUMN `ReadAt` DATETIME(3) NULL,
    ADD COLUMN `Status` ENUM('read', 'unread') NOT NULL DEFAULT 'unread';
