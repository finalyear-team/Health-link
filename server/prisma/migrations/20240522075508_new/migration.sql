/*
  Warnings:

  - Made the column `AppointmentDate` on table `Appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `AppointmentTime` on table `Appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Appointments` MODIFY `AppointmentDate` DATE NOT NULL,
    MODIFY `AppointmentTime` TIME NOT NULL;

-- CreateTable
CREATE TABLE `Followers` (
    `FollowerID` VARCHAR(191) NOT NULL,
    `FollowingID` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `follower_following_unique`(`FollowerID`, `FollowingID`),
    PRIMARY KEY (`FollowerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_FollowerID_fkey` FOREIGN KEY (`FollowerID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_FollowingID_fkey` FOREIGN KEY (`FollowingID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
