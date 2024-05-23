/*
  Warnings:

  - The primary key for the `MemberInVideoChat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserId` on the `MemberInVideoChat` table. All the data in the column will be lost.
  - You are about to drop the column `HostId` on the `VideoChatRoom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[MemberID]` on the table `MemberInVideoChat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `MemberID` to the `MemberInVideoChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HostID` to the `VideoChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MemberInVideoChat` DROP FOREIGN KEY `MemberInVideoChat_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `VideoChatRoom` DROP FOREIGN KEY `VideoChatRoom_HostId_fkey`;

-- AlterTable
ALTER TABLE `MemberInVideoChat` DROP PRIMARY KEY,
    DROP COLUMN `UserId`,
    ADD COLUMN `MemberID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`MemberID`);

-- AlterTable
ALTER TABLE `VideoChatRoom` DROP COLUMN `HostId`,
    ADD COLUMN `HostID` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MemberInVideoChat_MemberID_key` ON `MemberInVideoChat`(`MemberID`);

-- AddForeignKey
ALTER TABLE `VideoChatRoom` ADD CONSTRAINT `VideoChatRoom_HostID_fkey` FOREIGN KEY (`HostID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberInVideoChat` ADD CONSTRAINT `MemberInVideoChat_MemberID_fkey` FOREIGN KEY (`MemberID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
