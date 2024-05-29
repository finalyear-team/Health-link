/*
  Warnings:

  - The values [Male,Female] on the enum `Users_Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Likes` ADD COLUMN `LikeType` ENUM('like', 'dislike') NOT NULL DEFAULT 'like';

-- AlterTable
ALTER TABLE `Users` MODIFY `Gender` ENUM('male', 'female') NULL;
