/*
  Warnings:

  - You are about to drop the `SupportChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportGroupMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[AppointmentID]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ConsultancyID]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `SupportChatMessage` DROP FOREIGN KEY `SupportChatMessage_SupportGroupID_fkey`;

-- DropForeignKey
ALTER TABLE `SupportGroupMember` DROP FOREIGN KEY `SupportGroupMember_SupportGroupID_fkey`;

-- DropForeignKey
ALTER TABLE `SupportGroupMember` DROP FOREIGN KEY `SupportGroupMember_UserID_fkey`;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `ParentCommentID` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserDetails` MODIFY `FirstName` VARCHAR(191) NULL,
    MODIFY `LastName` VARCHAR(191) NULL,
    MODIFY `DateOfBirth` DATETIME(3) NULL,
    MODIFY `Gender` ENUM('Male', 'Female') NULL;

-- DropTable
DROP TABLE `SupportChatMessage`;

-- DropTable
DROP TABLE `SupportGroup`;

-- DropTable
DROP TABLE `SupportGroupMember`;

-- CreateTable
CREATE TABLE `PeerSupportGroup` (
    `PeerSupportGroupID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,
    `Disease` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `ProfilePic` VARCHAR(191) NULL,

    PRIMARY KEY (`PeerSupportGroupID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeerSupportGroupMember` (
    `PeerSupportGroupMemberID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `PeerSupportGroupID` VARCHAR(191) NOT NULL,
    `Role` ENUM('member', 'moderator', 'admin', 'guest', 'banned') NOT NULL DEFAULT 'member',
    `JoinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`PeerSupportGroupMemberID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeerSupportChatMessage` (
    `ChatMessageID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `SenderType` VARCHAR(191) NOT NULL,
    `SenderID` VARCHAR(191) NOT NULL,
    `MediaUrl` VARCHAR(191) NULL,
    `SentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsSeen` BOOLEAN NOT NULL DEFAULT false,
    `PeerSupportGroupID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ChatMessageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Payment_AppointmentID_key` ON `Payment`(`AppointmentID`);

-- CreateIndex
CREATE UNIQUE INDEX `Payment_ConsultancyID_key` ON `Payment`(`ConsultancyID`);

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_SenderID_fkey` FOREIGN KEY (`SenderID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeerSupportGroupMember` ADD CONSTRAINT `PeerSupportGroupMember_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeerSupportGroupMember` ADD CONSTRAINT `PeerSupportGroupMember_PeerSupportGroupID_fkey` FOREIGN KEY (`PeerSupportGroupID`) REFERENCES `PeerSupportGroup`(`PeerSupportGroupID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeerSupportChatMessage` ADD CONSTRAINT `PeerSupportChatMessage_PeerSupportGroupID_fkey` FOREIGN KEY (`PeerSupportGroupID`) REFERENCES `PeerSupportGroup`(`PeerSupportGroupID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeerSupportChatMessage` ADD CONSTRAINT `PeerSupportChatMessage_SenderID_fkey` FOREIGN KEY (`SenderID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_AppointmentID_fkey` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments`(`AppointmentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_ConsultancyID_fkey` FOREIGN KEY (`ConsultancyID`) REFERENCES `Consultancy`(`ConsultancyID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ParentCommentID_fkey` FOREIGN KEY (`ParentCommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE SET NULL ON UPDATE CASCADE;
