/*
  Warnings:

  - You are about to alter the column `MediaType` on the `PostMedia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(12))`.

*/
-- AlterTable
ALTER TABLE `Comments` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment') NOT NULL;

-- AlterTable
ALTER TABLE `Likes` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment') NOT NULL;

-- AlterTable
ALTER TABLE `PostMedia` MODIFY `MediaType` ENUM('video', 'image') NOT NULL;

-- AlterTable
ALTER TABLE `Views` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment') NOT NULL;
