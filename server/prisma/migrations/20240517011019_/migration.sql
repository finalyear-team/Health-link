/*
  Warnings:

  - The primary key for the `DoctorDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DoctorDetailsID` on the `DoctorDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DoctorDetails` DROP PRIMARY KEY,
    DROP COLUMN `DoctorDetailsID`,
    ADD PRIMARY KEY (`DoctorID`);
