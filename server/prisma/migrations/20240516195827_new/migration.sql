-- CreateTable
CREATE TABLE `Users` (
    `UserID` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NOT NULL,
    `DateOfBirth` DATETIME(3) NULL,
    `Gender` ENUM('Male', 'Female') NULL,
    `Bio` LONGTEXT NULL,
    `PhoneNumber` VARCHAR(191) NULL,
    `Address` VARCHAR(191) NULL,
    `ProfilePicture` VARCHAR(191) NULL,
    `Role` ENUM('doctor', 'patient', 'admin', 'moderator', 'organization') NOT NULL,
    `Status` ENUM('active', 'inactive', 'suspended', 'blocked', 'deleted') NOT NULL,
    `Verified` BOOLEAN NOT NULL DEFAULT false,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `LastLogin` DATETIME(3) NULL,

    UNIQUE INDEX `Users_Username_key`(`Username`),
    UNIQUE INDEX `Users_Email_key`(`Email`),
    INDEX `email_index`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalRecord` (
    `RecordID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `DateOfRecord` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Diagnosis` JSON NULL,
    `Medications` JSON NULL,
    `Allergies` JSON NULL,

    PRIMARY KEY (`RecordID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorDetails` (
    `DoctorDetailsID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `Specialty` VARCHAR(191) NULL,
    `ConsultationFee` DECIMAL(65, 30) NULL,
    `EducationalQualifications` JSON NULL,
    `LicenseNumber` VARCHAR(191) NULL,
    `ExperienceYears` INTEGER NULL,

    UNIQUE INDEX `DoctorDetails_DoctorID_key`(`DoctorID`),
    INDEX `Specialty_index`(`Specialty`),
    PRIMARY KEY (`DoctorDetailsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorSchedule` (
    `ScheduleID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `ConsultancyType` ENUM('InitialConsultation', 'FollowUp', 'Emergency') NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `AvailableTimes` JSON NULL,
    `Duration` INTEGER NULL,
    `Status` ENUM('Active', 'Inactive', 'TemporarilyUnavailable') NULL,
    `Priority` INTEGER NULL,
    `Notes` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ScheduleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointments` (
    `AppointmentID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `PatientID` VARCHAR(191) NOT NULL,
    `AppointmentDate` DATETIME(3) NOT NULL,
    `AppointmentTime` DATETIME(3) NOT NULL,
    `Duration` INTEGER NOT NULL,
    `Status` ENUM('Scheduled', 'Completed', 'Cancelled') NOT NULL,
    `Notes` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `CancelledBy` VARCHAR(191) NULL,
    `CancelledReason` VARCHAR(191) NULL,

    UNIQUE INDEX `Appointments_CancelledBy_key`(`CancelledBy`),
    INDEX `status_index`(`Status`),
    INDEX `doctor_patient_index`(`DoctorID`, `PatientID`),
    PRIMARY KEY (`AppointmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `BookingID` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `PatientID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `AppointmentID` VARCHAR(191) NOT NULL,
    `ReminderSent` BOOLEAN NOT NULL DEFAULT false,
    `ReminderDate` DATETIME(3) NULL,
    `CancelledBy` VARCHAR(191) NULL,
    `CancelledReason` VARCHAR(191) NULL,

    UNIQUE INDEX `Booking_AppointmentID_key`(`AppointmentID`),
    UNIQUE INDEX `Booking_CancelledBy_key`(`CancelledBy`),
    INDEX `patient_doctor_index`(`DoctorID`),
    PRIMARY KEY (`BookingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultancy` (
    `ConsultancyID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `PatientID` VARCHAR(191) NOT NULL,
    `ConsultancyDate` DATETIME(3) NOT NULL,
    `ConsultancyTime` DATETIME(3) NOT NULL,
    `Duration` INTEGER NOT NULL,
    `Status` ENUM('Scheduled', 'Completed', 'Cancelled') NOT NULL,
    `ConsultancyType` ENUM('InitialConsultation', 'FollowUp', 'Emergency') NOT NULL,
    `Notes` LONGTEXT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `CancelledBy` VARCHAR(191) NULL,
    `CancelledReason` VARCHAR(191) NULL,

    INDEX `consultancy_status_index`(`Status`),
    PRIMARY KEY (`ConsultancyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoChatRoom` (
    `RoomID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `HostId` VARCHAR(191) NOT NULL,
    `MemberId` VARCHAR(191) NOT NULL,
    `HostAuthToken` LONGTEXT NOT NULL,
    `ConstultancyID` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`RoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberInVideoChat` (
    `UserId` VARCHAR(191) NOT NULL,
    `VideoChatRoomID` VARCHAR(191) NOT NULL,
    `MemberAuthToken` LONGTEXT NOT NULL,

    UNIQUE INDEX `MemberInVideoChat_UserId_key`(`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatChannel` (
    `ChannelID` VARCHAR(191) NOT NULL,
    `ChannelName` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NULL,
    `Description` TEXT NULL,
    `Disease` VARCHAR(191) NULL,
    `ChannelType` ENUM('DM', 'SupportGroup') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ChatChannel_ChannelID_key`(`ChannelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatMessage` (
    `ChatID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `SenderID` VARCHAR(191) NOT NULL,
    `MediaUrl` VARCHAR(191) NULL,
    `SentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsSeen` BOOLEAN NOT NULL DEFAULT false,
    `ChannelID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ChatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChannelMember` (
    `UserID` VARCHAR(191) NOT NULL,
    `ChannelID` VARCHAR(191) NOT NULL,
    `AuthToken` LONGTEXT NOT NULL,
    `Role` ENUM('member', 'moderator', 'admin', 'guest', 'banned') NOT NULL DEFAULT 'member',
    `JoinedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ChannelMember_UserID_key`(`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `PaymentID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `PaymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PaymentMethod` VARCHAR(191) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `AppointmentID` VARCHAR(191) NULL,
    `ConsultancyID` VARCHAR(191) NULL,

    UNIQUE INDEX `Payment_AppointmentID_key`(`AppointmentID`),
    UNIQUE INDEX `Payment_ConsultancyID_key`(`ConsultancyID`),
    INDEX `doctor_payment_index`(`DoctorID`),
    PRIMARY KEY (`PaymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorReviews` (
    `ReviewID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `ReviewerID` VARCHAR(191) NOT NULL,
    `Rating` INTEGER NULL,
    `ReviewText` VARCHAR(191) NULL,
    `ReviewDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `doctor_review_index`(`DoctorID`),
    PRIMARY KEY (`ReviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `BlogID` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsPublished` BOOLEAN NOT NULL DEFAULT false,
    `DoctorID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`BlogID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForumPost` (
    `ForumPostID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ForumPostID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForumAnswer` (
    `ForumAnswerID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `ForumPostID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ForumAnswerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `PostID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `MediaUrl` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`PostID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `CommentID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `ItemID` VARCHAR(191) NOT NULL,
    `ParentCommentID` VARCHAR(191) NULL,
    `ItemType` ENUM('forumAnswer', 'post') NOT NULL,

    PRIMARY KEY (`CommentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `LikeID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `ItemID` VARCHAR(191) NOT NULL,
    `ItemType` ENUM('forumAnswer', 'post') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`LikeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Views` (
    `ViewID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NULL,
    `ItemID` VARCHAR(191) NOT NULL,
    `ItemType` ENUM('forumAnswer', 'post') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ViewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FAQ` (
    `FAQID` VARCHAR(191) NOT NULL,
    `Question` VARCHAR(191) NOT NULL,
    `Answer` VARCHAR(191) NOT NULL,
    `Order` INTEGER NOT NULL DEFAULT 0,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`FAQID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFeedback` (
    `FeedbackID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `Type` ENUM('GeneralFeedback', 'ProductReview', 'ServiceReview') NOT NULL,
    `Rating` INTEGER NULL,
    `Review` VARCHAR(191) NULL,

    PRIMARY KEY (`FeedbackID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reply` (
    `ReplyID` VARCHAR(191) NOT NULL,
    `FeedbackID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ReplyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prescription` (
    `PrescriptionID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `PatientID` VARCHAR(191) NOT NULL,
    `IssuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ValidUntil` DATETIME(3) NULL,
    `Notes` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL,

    PRIMARY KEY (`PrescriptionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescriptionItem` (
    `PrescriptionItemID` VARCHAR(191) NOT NULL,
    `PrescriptionID` VARCHAR(191) NOT NULL,
    `MedicationName` VARCHAR(191) NOT NULL,
    `Dosage` VARCHAR(191) NOT NULL,
    `Instructions` VARCHAR(191) NULL,
    `Quantity` INTEGER NULL,
    `Frequency` VARCHAR(191) NULL,
    `Duration` VARCHAR(191) NULL,

    PRIMARY KEY (`PrescriptionItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrescriptionAttachment` (
    `AttachmentID` VARCHAR(191) NOT NULL,
    `PrescriptionID` VARCHAR(191) NOT NULL,
    `URL` VARCHAR(191) NOT NULL,
    `Filename` VARCHAR(191) NOT NULL,
    `Size` INTEGER NOT NULL,
    `Caption` VARCHAR(191) NULL,
    `FileType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`AttachmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSessions` (
    `SessionID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `SessionToken` VARCHAR(191) NOT NULL,
    `SessionStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `SessionEnd` DATETIME(3) NULL,
    `IPAddress` VARCHAR(191) NULL,
    `UserAgent` VARCHAR(191) NULL,

    INDEX `user_session_index`(`UserID`),
    PRIMARY KEY (`SessionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicalRecord` ADD CONSTRAINT `MedicalRecord_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorDetails` ADD CONSTRAINT `DoctorDetails_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorSchedule` ADD CONSTRAINT `DoctorSchedule_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_CancelledBy_fkey` FOREIGN KEY (`CancelledBy`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_AppointmentID_fkey` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments`(`AppointmentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_CancelledBy_fkey` FOREIGN KEY (`CancelledBy`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultancy` ADD CONSTRAINT `Consultancy_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultancy` ADD CONSTRAINT `Consultancy_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoChatRoom` ADD CONSTRAINT `VideoChatRoom_HostId_fkey` FOREIGN KEY (`HostId`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoChatRoom` ADD CONSTRAINT `VideoChatRoom_ConstultancyID_fkey` FOREIGN KEY (`ConstultancyID`) REFERENCES `Consultancy`(`ConsultancyID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberInVideoChat` ADD CONSTRAINT `MemberInVideoChat_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberInVideoChat` ADD CONSTRAINT `MemberInVideoChat_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom`(`RoomID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_SenderID_fkey` FOREIGN KEY (`SenderID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel`(`ChannelID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel`(`ChannelID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_AppointmentID_fkey` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments`(`AppointmentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_ConsultancyID_fkey` FOREIGN KEY (`ConsultancyID`) REFERENCES `Consultancy`(`ConsultancyID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorReviews` ADD CONSTRAINT `DoctorReviews_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorReviews` ADD CONSTRAINT `DoctorReviews_ReviewerID_fkey` FOREIGN KEY (`ReviewerID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumPost` ADD CONSTRAINT `ForumPost_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumAnswer` ADD CONSTRAINT `ForumAnswer_ForumPostID_fkey` FOREIGN KEY (`ForumPostID`) REFERENCES `ForumPost`(`ForumPostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumAnswer` ADD CONSTRAINT `ForumAnswer_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ParentCommentID_fkey` FOREIGN KEY (`ParentCommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `forumanswer_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `forum_answer_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `commet_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments`(`CommentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Views` ADD CONSTRAINT `Views_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Views` ADD CONSTRAINT `Views_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost`(`BlogID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Views` ADD CONSTRAINT `post_view_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFeedback` ADD CONSTRAINT `UserFeedback_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_FeedbackID_fkey` FOREIGN KEY (`FeedbackID`) REFERENCES `UserFeedback`(`FeedbackID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `DoctorDetails`(`DoctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription`(`PrescriptionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionAttachment` ADD CONSTRAINT `PrescriptionAttachment_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription`(`PrescriptionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSessions` ADD CONSTRAINT `UserSessions_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
