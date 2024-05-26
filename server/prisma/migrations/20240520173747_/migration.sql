/*
  Warnings:

  - You are about to drop the column `Notes` on the `Appointments` table. All the data in the column will be lost.
  - You are about to drop the column `Notes` on the `DoctorSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `Notes` on the `Prescription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `Appointments_CancelledBy_fkey`;

-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `Appointments_DoctorID_fkey`;

-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `Appointments_PatientID_fkey`;

-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `Appointments_ScheduleID_fkey`;

-- DropForeignKey
ALTER TABLE `Appointments` DROP FOREIGN KEY `Appointments_VideoChatRoomID_fkey`;

-- DropForeignKey
ALTER TABLE `DoctorSchedule` DROP FOREIGN KEY `DoctorSchedule_DoctorID_fkey`;

-- AlterTable
ALTER TABLE `Appointments` DROP COLUMN `Notes`,
    ADD COLUMN `Note` TEXT NULL;

-- AlterTable
ALTER TABLE `DoctorSchedule` DROP COLUMN `Notes`,
    ADD COLUMN `Note` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Prescription` DROP COLUMN `Notes`,
    ADD COLUMN `Note` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `Gender` ENUM('Male', 'Female') NULL;

-- CreateIndex
CREATE INDEX `status_index` ON `Appointments`(`Status`);

-- CreateIndex
CREATE INDEX `doctor_patient_index` ON `Appointments`(`DoctorID`, `PatientID`);

-- AddForeignKey
ALTER TABLE `DoctorSchedule` ADD CONSTRAINT `DoctorSchedule_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_CancelledBy_fkey` FOREIGN KEY (`CancelledBy`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_ScheduleID_fkey` FOREIGN KEY (`ScheduleID`) REFERENCES `DoctorSchedule`(`ScheduleID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom`(`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE;
