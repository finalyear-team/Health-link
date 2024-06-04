/*
  Warnings:

  - You are about to drop the column `ReviewDate` on the `DoctorReviews` table. All the data in the column will be lost.
  - Added the required column `UpdatedAt` to the `DoctorReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DoctorReviews` DROP COLUMN `ReviewDate`,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;
