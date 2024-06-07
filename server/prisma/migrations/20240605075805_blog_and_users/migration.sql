/*
  Warnings:

  - You are about to drop the `Views` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Category` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `View` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `View` to the `ForumAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `View` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Views` DROP FOREIGN KEY `Views_ItemID_fkey`;

-- DropForeignKey
ALTER TABLE `Views` DROP FOREIGN KEY `Views_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `Views` DROP FOREIGN KEY `comment_view_fkey`;

-- DropForeignKey
ALTER TABLE `Views` DROP FOREIGN KEY `forum_answer_view_fkey`;

-- DropForeignKey
ALTER TABLE `Views` DROP FOREIGN KEY `post_view_fkey`;

-- AlterTable
ALTER TABLE `BlogPost` ADD COLUMN `Category` ENUM('GeneralHealthAndWellness', 'MedicalConditions', 'DiseaseManagement', 'MentalHealth', 'NutritionAndDiet', 'FitnessAndExercise', 'MedicationAndTreatment', 'PatientStoriesAndTestimonials', 'MedicalResearchAndBreakthroughs', 'MedicalEducation', 'HealthTechnology', 'HealthcarePolicyAndAdvocacy', 'WomensHealth', 'MensHealth', 'PediatricsAndChildHealth', 'ElderlyCareAndAging', 'AlternativeMedicine', 'GlobalHealth', 'MedicalEthicsAndLegalIssues', 'CancerAwarenessAndSupport') NOT NULL,
    ADD COLUMN `Thumbnail` VARCHAR(191) NULL,
    ADD COLUMN `View` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `View` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ForumAnswer` ADD COLUMN `View` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `View` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Views`;

-- CreateTable
CREATE TABLE `Report` (
    `ReportID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `ItemID` VARCHAR(191) NOT NULL,
    `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL,
    `Reason` TEXT NOT NULL,
    `Status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ReportID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_post_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_blog_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost`(`BlogID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments`(`CommentID`) ON DELETE RESTRICT ON UPDATE CASCADE;
