/*
  Warnings:

  - The primary key for the `Followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Status` on the `Payment` table. All the data in the column will be lost.
  - The values [productReview,serviceReview] on the enum `UserFeedback_Type` will be removed. If these variants are still used in the database, this will fail.
  - The required column `FollowersID` was added to the `Followers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Followers` DROP PRIMARY KEY,
    ADD COLUMN `FollowersID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`FollowersID`);

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `Status`,
    MODIFY `PaymentStatus` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `UserFeedback` MODIFY `Content` VARCHAR(191) NULL,
    MODIFY `Type` ENUM('generalFeedback', 'question', 'review') NOT NULL DEFAULT 'generalFeedback';
