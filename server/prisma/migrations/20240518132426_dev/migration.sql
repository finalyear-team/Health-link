/*
  Warnings:

  - The values [moderator] on the enum `ChannelMember_Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `EducationalQualifications` on the `DoctorDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ChannelMember` MODIFY `Role` ENUM('member', 'owner', 'admin', 'guest', 'banned') NOT NULL DEFAULT 'member';

-- AlterTable
ALTER TABLE `DoctorDetails` DROP COLUMN `EducationalQualifications`,
    ADD COLUMN `EducationalBackground` JSON NULL;
