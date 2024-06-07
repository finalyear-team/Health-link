/*
  Warnings:

  - Added the required column `comeOn` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `comeOn` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Comeon` (
    `Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
