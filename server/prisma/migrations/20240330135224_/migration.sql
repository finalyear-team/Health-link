/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_Username_key` ON `Users`(`Username`);
