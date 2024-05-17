/*
  Warnings:

  - You are about to drop the column `Specialty` on the `DoctorDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Specialty_index` ON `DoctorDetails`;

-- AlterTable
ALTER TABLE `DoctorDetails` DROP COLUMN `Specialty`,
    ADD COLUMN `Speciality` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Speciality_index` ON `DoctorDetails`(`Speciality`);
