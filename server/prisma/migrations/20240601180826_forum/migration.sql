/*
  Warnings:

  - You are about to drop the column `Content` on the `ForumAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `ForumPost` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `ForumPost` table. All the data in the column will be lost.
  - Added the required column `Answer` to the `ForumAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Question` to the `ForumPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ForumAnswer` DROP COLUMN `Content`,
    ADD COLUMN `Answer` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ForumPost` DROP COLUMN `Content`,
    DROP COLUMN `Title`,
    ADD COLUMN `Question` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `PostMedia` ADD COLUMN `ForumAnswerID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_ForumAnswerID_fkey` FOREIGN KEY (`ForumAnswerID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;
