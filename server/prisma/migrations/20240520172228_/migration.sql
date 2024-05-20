/*
  Warnings:

  - Made the column `Gender` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` MODIFY `Gender` ENUM('Male', 'Female') NOT NULL;
