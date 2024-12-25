/*
  Warnings:

  - You are about to drop the column `UserName` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `UserName`,
    ADD COLUMN `Username` VARCHAR(191) NULL;
