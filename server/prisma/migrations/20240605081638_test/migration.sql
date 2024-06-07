-- AlterTable
ALTER TABLE `BlogPost` MODIFY `View` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ForumAnswer` MODIFY `View` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Post` MODIFY `View` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Comeon` (
    `Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `DoctorSchedule` RENAME INDEX `DoctorSchedule_DoctorID_fkey` TO `doctor_schedule_index`;

-- RenameIndex
ALTER TABLE `MedicalRecord` RENAME INDEX `MedicalRecord_UserID_fkey` TO `user_record_index`;

-- RenameIndex
ALTER TABLE `VideoChatRoom` RENAME INDEX `VideoChatRoom_HostID_fkey` TO `host_index`;
