-- CreateTable
CREATE TABLE `Users` (
    `UserID` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NULL,
    `LastName` VARCHAR(191) NULL,
    `Password` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NOT NULL,
    `DateOfBirth` DATETIME(3) NULL,
    `Gender` ENUM('male', 'female') NULL,
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

    INDEX `user_record_index`(`UserID`),
    PRIMARY KEY (`RecordID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorDetails` (
    `DoctorID` VARCHAR(191) NOT NULL,
    `Speciality` VARCHAR(191) NULL,
    `ConsultationFee` DOUBLE NULL,
    `EducationalBackground` JSON NULL,
    `LicenseNumber` VARCHAR(191) NULL,
    `ExperienceYears` INTEGER NULL,

    INDEX `Speciality_index`(`Speciality`),
    PRIMARY KEY (`DoctorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorSchedule` (
    `ScheduleID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `Date` DATE NULL,
    `WeekDay` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NULL,
    `StartTime` TIME NOT NULL,
    `EndTime` TIME NOT NULL,
    `ScheduleType` ENUM('emergency', 'personal', 'normal') NOT NULL DEFAULT 'normal',
    `Status` ENUM('available', 'unavailable') NOT NULL DEFAULT 'available',
    `Note` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    INDEX `doctor_schedule_index`(`DoctorID`),
    PRIMARY KEY (`ScheduleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointments` (
    `AppointmentID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `PatientID` VARCHAR(191) NOT NULL,
    `ScheduleID` VARCHAR(191) NULL,
    `AppointmentDate` DATE NOT NULL,
    `AppointmentTime` TIME NOT NULL,
    `Duration` INTEGER NULL,
    `Status` ENUM('pending', 'reschedulePending', 'overdue', 'booked', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    `AppointmentType` ENUM('initialConsultation', 'followup', 'emergency') NOT NULL DEFAULT 'initialConsultation',
    `Note` TEXT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UpdatedBy` VARCHAR(191) NULL,
    `CancelledBy` VARCHAR(191) NULL,
    `CancelledReason` VARCHAR(191) NULL,
    `VideoChatRoomID` VARCHAR(191) NOT NULL,

    INDEX `status_index`(`Status`),
    INDEX `doctor_patient_index`(`DoctorID`, `PatientID`),
    PRIMARY KEY (`AppointmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoChatRoom` (
    `RoomID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `HostID` VARCHAR(191) NOT NULL,
    `HostAuthToken` LONGTEXT NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    INDEX `host_index`(`HostID`),
    PRIMARY KEY (`RoomID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberInVideoChat` (
    `ID` VARCHAR(191) NOT NULL,
    `MemberID` VARCHAR(191) NOT NULL,
    `VideoChatRoomID` VARCHAR(191) NOT NULL,
    `MemberAuthToken` LONGTEXT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatChannel` (
    `ChannelID` VARCHAR(191) NOT NULL,
    `ChannelName` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NULL,
    `Description` TEXT NULL,
    `Disease` VARCHAR(191) NULL,
    `ChannelType` ENUM('dm', 'supportGroup') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ChannelID`)
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
    `ID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `ChannelID` VARCHAR(191) NOT NULL,
    `AuthToken` LONGTEXT NULL,
    `Role` ENUM('member', 'owner', 'admin', 'guest', 'banned') NULL DEFAULT 'member',
    `JoinedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `PaymentID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `PatientID` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `PaymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PaymentMethod` VARCHAR(191) NULL,
    `AppointmentID` VARCHAR(191) NULL,
    `PaymentStatus` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',

    UNIQUE INDEX `Payment_AppointmentID_key`(`AppointmentID`),
    INDEX `doctor_payment_index`(`DoctorID`),
    PRIMARY KEY (`PaymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorReviews` (
    `ReviewID` VARCHAR(191) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `ReviewerID` VARCHAR(191) NOT NULL,
    `Rating` INTEGER NULL DEFAULT 0,
    `ReviewText` LONGTEXT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    INDEX `doctor_review_index`(`DoctorID`),
    PRIMARY KEY (`ReviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `BlogID` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Content` LONGTEXT NOT NULL,
    `Thumbnail` VARCHAR(191) NULL,
    `PublishedAt` DATETIME(3) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `IsPublished` BOOLEAN NOT NULL DEFAULT false,
    `View` INTEGER NOT NULL DEFAULT 0,
    `Category` ENUM('GeneralHealthAndWellness', 'MedicalConditions', 'DiseaseManagement', 'MentalHealth', 'NutritionAndDiet', 'FitnessAndExercise', 'MedicationAndTreatment', 'PatientStoriesAndTestimonials', 'MedicalResearchAndBreakthroughs', 'MedicalEducation', 'HealthTechnology', 'HealthcarePolicyAndAdvocacy', 'WomensHealth', 'MensHealth', 'PediatricsAndChildHealth', 'ElderlyCareAndAging', 'AlternativeMedicine', 'GlobalHealth', 'MedicalEthicsAndLegalIssues', 'CancerAwarenessAndSupport') NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`BlogID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForumPost` (
    `ForumPostID` VARCHAR(191) NOT NULL,
    `Title` LONGTEXT NOT NULL,
    `Question` LONGTEXT NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ForumPostID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForumAnswer` (
    `ForumAnswerID` VARCHAR(191) NOT NULL,
    `Answer` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `ForumPostID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `View` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ForumAnswerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `PostID` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DoctorID` VARCHAR(191) NOT NULL,
    `View` INTEGER NOT NULL DEFAULT 0,

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
    `View` INTEGER NOT NULL DEFAULT 0,
    `Edited` BOOLEAN NOT NULL DEFAULT false,
    `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL,

    PRIMARY KEY (`CommentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostMedia` (
    `MediaID` VARCHAR(191) NOT NULL,
    `PostID` VARCHAR(191) NULL,
    `CommentID` VARCHAR(191) NULL,
    `ForumAnswerID` VARCHAR(191) NULL,
    `ContentType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL DEFAULT 'post',
    `MediaType` ENUM('video', 'image') NOT NULL,
    `URL` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`MediaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `LikeID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `ItemID` VARCHAR(191) NOT NULL,
    `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL,
    `LikeType` ENUM('like', 'dislike') NOT NULL DEFAULT 'like',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Likes_UserID_idx`(`UserID`),
    INDEX `Likes_ItemID_idx`(`ItemID`),
    INDEX `Likes_CreatedAt_idx`(`CreatedAt`),
    PRIMARY KEY (`LikeID`)
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
    `Content` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `Type` ENUM('generalFeedback', 'question', 'review', 'enquiry') NOT NULL DEFAULT 'generalFeedback',
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
    `Note` VARCHAR(191) NULL,
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
CREATE TABLE `Followers` (
    `FollowersID` VARCHAR(191) NOT NULL,
    `FollowerID` VARCHAR(191) NOT NULL,
    `FollowingID` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `follower_following_unique`(`FollowerID`, `FollowingID`),
    PRIMARY KEY (`FollowersID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `NotificationID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `Message` TEXT NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ReadAt` DATETIME(3) NULL,
    `Status` ENUM('read', 'unread') NOT NULL DEFAULT 'unread',
    `NotificationType` ENUM('newAppointment', 'cancelAppointment', 'acceptAppointment', 'rescheduleAppointment', 'newChat', 'newVideoCall', 'newPost', 'newForumQuestion', 'newForumAnswer', 'newComment') NOT NULL,
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`NotificationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Wallet` (
    `WalletID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `Balance` DOUBLE NOT NULL DEFAULT 0,

    INDEX `wallet_user_index`(`UserID`),
    PRIMARY KEY (`WalletID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `TransactionID` VARCHAR(191) NOT NULL,
    `WalletID` VARCHAR(191) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Type` ENUM('debit', 'credit') NOT NULL,
    `Description` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    INDEX `transaction_wallet_index`(`WalletID`),
    PRIMARY KEY (`TransactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicalRecord` ADD CONSTRAINT `MedicalRecord_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorDetails` ADD CONSTRAINT `DoctorDetails_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorSchedule` ADD CONSTRAINT `DoctorSchedule_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_UpdatedBy_fkey` FOREIGN KEY (`UpdatedBy`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_CancelledBy_fkey` FOREIGN KEY (`CancelledBy`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_ScheduleID_fkey` FOREIGN KEY (`ScheduleID`) REFERENCES `DoctorSchedule`(`ScheduleID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom`(`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoChatRoom` ADD CONSTRAINT `VideoChatRoom_HostID_fkey` FOREIGN KEY (`HostID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberInVideoChat` ADD CONSTRAINT `MemberInVideoChat_MemberID_fkey` FOREIGN KEY (`MemberID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberInVideoChat` ADD CONSTRAINT `MemberInVideoChat_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom`(`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_SenderID_fkey` FOREIGN KEY (`SenderID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel`(`ChannelID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelMember` ADD CONSTRAINT `ChannelMember_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel`(`ChannelID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_AppointmentID_fkey` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments`(`AppointmentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorReviews` ADD CONSTRAINT `DoctorReviews_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorReviews` ADD CONSTRAINT `DoctorReviews_ReviewerID_fkey` FOREIGN KEY (`ReviewerID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumPost` ADD CONSTRAINT `ForumPost_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumAnswer` ADD CONSTRAINT `ForumAnswer_ForumPostID_fkey` FOREIGN KEY (`ForumPostID`) REFERENCES `ForumPost`(`ForumPostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForumAnswer` ADD CONSTRAINT `ForumAnswer_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ParentCommentID_fkey` FOREIGN KEY (`ParentCommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `forumanswer_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `blogpost_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost`(`BlogID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_CommentID_fkey` FOREIGN KEY (`CommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_ForumAnswerID_fkey` FOREIGN KEY (`ForumAnswerID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `forum_answer_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `commet_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments`(`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFeedback` ADD CONSTRAINT `UserFeedback_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_FeedbackID_fkey` FOREIGN KEY (`FeedbackID`) REFERENCES `UserFeedback`(`FeedbackID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionItem` ADD CONSTRAINT `PrescriptionItem_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription`(`PrescriptionID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrescriptionAttachment` ADD CONSTRAINT `PrescriptionAttachment_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription`(`PrescriptionID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_FollowerID_fkey` FOREIGN KEY (`FollowerID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followers` ADD CONSTRAINT `Followers_FollowingID_fkey` FOREIGN KEY (`FollowingID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_post_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post`(`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_blog_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost`(`BlogID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `report_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments`(`CommentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_WalletID_fkey` FOREIGN KEY (`WalletID`) REFERENCES `Wallet`(`WalletID`) ON DELETE RESTRICT ON UPDATE CASCADE;
