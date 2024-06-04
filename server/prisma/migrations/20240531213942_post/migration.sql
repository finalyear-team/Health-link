/*
  Warnings:

  - You are about to drop the column `MediaUrl` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `MediaUrl`;

-- CreateTable
CREATE TABLE `PostMedia` (
    `MediaID` VARCHAR(191) NOT NULL,
    `PostID` VARCHAR(191) NULL,
    `CommentID` VARCHAR(191) NULL,
    `MediaType` VARCHAR(191) NOT NULL,
    `URL` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`MediaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Share` (
    `ShareID` VARCHAR(191) NOT NULL,
    `PostID` VARCHAR(191) NOT NULL,
    `Platform` VARCHAR(191) NOT NULL,
    `SharedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ShareID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `BookmarkID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `PostID` VARCHAR(191) NOT NULL,
    `AddedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `RemovedAt` DATETIME(3) NULL,

    PRIMARY KEY (`BookmarkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_CommentID_fkey` FOREIGN KEY (`CommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;
