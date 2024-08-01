-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: Health_link
-- ------------------------------------------------------
-- Server version	8.0.36
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Appointments` (
  `AppointmentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ScheduleID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppointmentDate` date NOT NULL,
  `AppointmentTime` time NOT NULL,
  `Duration` int DEFAULT NULL,
  `Status` enum(
    'pending',
    'reschedulePending',
    'overdue',
    'booked',
    'completed',
    'cancelled'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `AppointmentType` enum('initialConsultation', 'followup', 'emergency') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initialConsultation',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `CancelledBy` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CancelledReason` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VideoChatRoomID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `UpdatedBy` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`AppointmentID`),
  KEY `status_index` (`Status`),
  KEY `doctor_patient_index` (`DoctorID`, `PatientID`),
  KEY `Appointments_PatientID_fkey` (`PatientID`),
  KEY `Appointments_ScheduleID_fkey` (`ScheduleID`),
  KEY `Appointments_VideoChatRoomID_fkey` (`VideoChatRoomID`),
  KEY `Appointments_UpdatedBy_fkey` (`UpdatedBy`),
  KEY `Appointments_CancelledBy_fkey` (`CancelledBy`),
  CONSTRAINT `Appointments_CancelledBy_fkey` FOREIGN KEY (`CancelledBy`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Appointments_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Appointments_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Appointments_ScheduleID_fkey` FOREIGN KEY (`ScheduleID`) REFERENCES `DoctorSchedule` (`ScheduleID`) ON DELETE
  SET NULL ON UPDATE CASCADE,
    CONSTRAINT `Appointments_UpdatedBy_fkey` FOREIGN KEY (`UpdatedBy`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Appointments_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom` (`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */
;
INSERT INTO `Appointments`
VALUES (
    '09668957-8553-412e-811d-ba896d0b05aa',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '40b2fbec-7c53-459d-a90f-222178c8c46a',
    '2024-07-23',
    '23:00:00',
    3,
    'overdue',
    'initialConsultation',
    '2024-07-23 17:27:50.651',
    '2024-07-24 05:52:11.016',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '1af623cf-8c23-4e41-836a-b0280a357c13',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-22',
    '20:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-22 19:00:36.488',
    '2024-07-24 17:55:37.826',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '1f41c826-7150-4d4f-be25-61d64238a904',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '232a8405-2666-4e6e-a471-2f644c7ae87b',
    '2024-07-22',
    '18:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-22 19:08:33.750',
    '2024-07-22 19:09:18.022',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'decline',
    '6687b19d70e5a7cdaea564f3',
    'alskdflaksjdlfkj',
    NULL
  ),
  (
    '29451ac6-8eff-46cb-9e88-943517a7f994',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '232a8405-2666-4e6e-a471-2f644c7ae87b',
    '2024-07-22',
    '20:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-22 19:55:25.605',
    '2024-07-22 21:50:59.558',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '',
    '6687b19d70e5a7cdaea564f3',
    'please work',
    NULL
  ),
  (
    '2ad09a4a-9fbc-4e99-af14-d8bb135713c8',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '796f41dc-504b-44a3-a119-c77a57082cfe',
    '2024-07-23',
    '15:00:00',
    1,
    'completed',
    'initialConsultation',
    '2024-07-23 13:48:10.092',
    '2024-07-23 15:16:43.789',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '416b2151-8590-40ea-b709-0683f6eb965c',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-23',
    '16:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-23 13:43:15.008',
    '2024-07-23 13:47:15.697',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '6ee97796-d3f7-4115-b469-c35a6c9b8b68',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '4ef390c1-89b7-4699-aa08-b490e6886291',
    '2024-07-23',
    '19:00:00',
    3,
    'overdue',
    'initialConsultation',
    '2024-07-23 13:50:29.643',
    '2024-07-24 05:52:11.016',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '780b1d2a-4a9b-437a-8c1a-60b480f3818b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-22',
    '01:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-22 21:52:00.168',
    '2024-07-24 17:54:14.078',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'sldkfjlaksjdf',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'abebf515-8f83-488f-8841-fea4bce22dc5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '7a41b0f1-a9e9-4f2f-8304-c7aab1eb29b5',
    '2024-07-22',
    '22:00:00',
    3,
    'overdue',
    'initialConsultation',
    '2024-07-22 21:50:08.199',
    '2024-07-23 01:00:48.162',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'd30f0f05-9527-4971-9756-e5cc447226f4',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-23',
    '15:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-23 13:42:16.796',
    '2024-07-23 13:47:12.005',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'd39deae8-0d46-4665-824c-de0552ad9956',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-23',
    '15:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-23 13:41:00.790',
    '2024-07-23 13:47:08.680',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'da63b8b0-b763-48ce-840c-37705047b238',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '90fde71b-e6e2-48ea-9e09-54b679c8c50d',
    '2024-07-23',
    '22:00:00',
    2,
    'overdue',
    'initialConsultation',
    '2024-07-23 18:49:14.962',
    '2024-07-24 05:52:11.016',
    NULL,
    NULL,
    '669ffb2a35ff39dcf0614833',
    'first appointment',
    NULL
  ),
  (
    'f06aa47c-71ad-4d27-b27f-c56f8de70f3e',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-24',
    '15:00:00',
    1,
    'cancelled',
    'initialConsultation',
    '2024-07-23 13:31:47.797',
    '2024-07-23 13:47:18.922',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'f25a9b12-1499-443a-9816-e9e494d928b9',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '35049521-f792-45f9-af5f-fbd7f2f45023',
    '2024-07-23',
    '22:00:00',
    1,
    'overdue',
    'initialConsultation',
    '2024-07-23 17:19:45.801',
    '2024-07-24 05:52:11.016',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  );
/*!40000 ALTER TABLE `Appointments` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `BlogPost`
--

DROP TABLE IF EXISTS `BlogPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `BlogPost` (
  `BlogID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `IsPublished` tinyint(1) NOT NULL DEFAULT '0',
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PublishedAt` datetime(3) DEFAULT NULL,
  `Category` enum(
    'GeneralHealthAndWellness',
    'MedicalConditions',
    'DiseaseManagement',
    'MentalHealth',
    'NutritionAndDiet',
    'FitnessAndExercise',
    'MedicationAndTreatment',
    'PatientStoriesAndTestimonials',
    'MedicalResearchAndBreakthroughs',
    'MedicalEducation',
    'HealthTechnology',
    'HealthcarePolicyAndAdvocacy',
    'WomensHealth',
    'MensHealth',
    'PediatricsAndChildHealth',
    'ElderlyCareAndAging',
    'AlternativeMedicine',
    'GlobalHealth',
    'MedicalEthicsAndLegalIssues',
    'CancerAwarenessAndSupport'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Thumbnail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `View` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`BlogID`),
  KEY `BlogPost_DoctorID_fkey` (`DoctorID`),
  CONSTRAINT `BlogPost_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `BlogPost`
--

LOCK TABLES `BlogPost` WRITE;
/*!40000 ALTER TABLE `BlogPost` DISABLE KEYS */
;
/*!40000 ALTER TABLE `BlogPost` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Bookmark`
--

DROP TABLE IF EXISTS `Bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Bookmark` (
  `BookmarkID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `AddedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `RemovedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`BookmarkID`),
  KEY `Bookmark_UserID_fkey` (`UserID`),
  KEY `Bookmark_PostID_fkey` (`PostID`),
  CONSTRAINT `Bookmark_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Bookmark_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Bookmark`
--

LOCK TABLES `Bookmark` WRITE;
/*!40000 ALTER TABLE `Bookmark` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Bookmark` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ChannelMember`
--

DROP TABLE IF EXISTS `ChannelMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ChannelMember` (
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ChannelID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `AuthToken` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Role` enum('member', 'owner', 'admin', 'guest', 'banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'member',
  `JoinedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `CreatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) DEFAULT NULL,
  `ID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ChannelMember_UserID_fkey` (`UserID`),
  KEY `ChannelMember_ChannelID_fkey` (`ChannelID`),
  CONSTRAINT `ChannelMember_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel` (`ChannelID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ChannelMember_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ChannelMember`
--

LOCK TABLES `ChannelMember` WRITE;
/*!40000 ALTER TABLE `ChannelMember` DISABLE KEYS */
;
INSERT INTO `ChannelMember`
VALUES (
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dm-38cceb',
    NULL,
    'member',
    '2024-07-23 18:49:37.996',
    '2024-07-23 18:49:37.996',
    '2024-07-23 18:49:37.996',
    '82477a2e-b36c-4411-864c-16d4a613a412'
  ),
  (
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dm-d24967',
    NULL,
    'member',
    '2024-07-23 17:28:02.282',
    '2024-07-23 17:28:02.282',
    '2024-07-23 17:28:02.282',
    'a21fc87a-f932-48ec-aebd-5cbc9f9b5a1c'
  ),
  (
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    'dm-38cceb',
    NULL,
    'member',
    '2024-07-23 18:49:37.996',
    '2024-07-23 18:49:37.996',
    '2024-07-23 18:49:37.996',
    'a2cf7381-401b-4696-b77f-01eed735c3a4'
  ),
  (
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dm-d24967',
    NULL,
    'member',
    '2024-07-23 17:28:02.282',
    '2024-07-23 17:28:02.282',
    '2024-07-23 17:28:02.282',
    'f2402fb5-cdd6-40d7-8c07-a9628581352e'
  );
/*!40000 ALTER TABLE `ChannelMember` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ChatChannel`
--

DROP TABLE IF EXISTS `ChatChannel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ChatChannel` (
  `ChannelID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ChannelName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Disease` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChannelType` enum('dm', 'supportGroup') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`ChannelID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ChatChannel`
--

LOCK TABLES `ChatChannel` WRITE;
/*!40000 ALTER TABLE `ChatChannel` DISABLE KEYS */
;
INSERT INTO `ChatChannel`
VALUES (
    'dm-38cceb',
    'dm-abebe-dawit',
    NULL,
    NULL,
    NULL,
    'dm',
    '2024-07-23 18:49:37.996',
    '2024-07-23 18:49:37.996'
  ),
  (
    'dm-d24967',
    'dm-surafel-dawit',
    NULL,
    NULL,
    NULL,
    'dm',
    '2024-07-23 17:28:02.282',
    '2024-07-23 17:28:02.282'
  );
/*!40000 ALTER TABLE `ChatChannel` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ChatMessage`
--

DROP TABLE IF EXISTS `ChatMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ChatMessage` (
  `ChatID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SenderID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MediaUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SentAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `IsSeen` tinyint(1) NOT NULL DEFAULT '0',
  `ChannelID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ChatID`),
  KEY `ChatMessage_SenderID_fkey` (`SenderID`),
  KEY `ChatMessage_ChannelID_fkey` (`ChannelID`),
  CONSTRAINT `ChatMessage_ChannelID_fkey` FOREIGN KEY (`ChannelID`) REFERENCES `ChatChannel` (`ChannelID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ChatMessage_SenderID_fkey` FOREIGN KEY (`SenderID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ChatMessage`
--

LOCK TABLES `ChatMessage` WRITE;
/*!40000 ALTER TABLE `ChatMessage` DISABLE KEYS */
;
INSERT INTO `ChatMessage`
VALUES (
    '0b7cba9b-7ac6-4058-9240-2fab0c1c45b7',
    'asdfj',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-24 17:39:19.136',
    0,
    'dm-d24967'
  ),
  (
    '3d105037-7b88-42ad-ad96-0506c485ada9',
    'askljdf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:39:58.262',
    0,
    'dm-d24967'
  ),
  (
    '3ecf1089-4c79-42ae-a878-f28c27243985',
    'laksdjhf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:39:44.156',
    0,
    'dm-d24967'
  ),
  (
    '44a0c7aa-e3b6-4c5a-9fdc-0732c583c4db',
    'aslkdf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:40:54.428',
    0,
    'dm-d24967'
  ),
  (
    '645fb6de-26e7-4f0f-80ab-264c11cb9cab',
    'alskdjflsjdf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 16:28:23.564',
    0,
    'dm-d24967'
  ),
  (
    '6580e0f6-2046-4dfc-8708-be8046614c57',
    'asldfkj',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-24 17:53:22.027',
    0,
    'dm-d24967'
  ),
  (
    '69b23594-add6-48dc-a5a7-633cd7020309',
    'askdfj',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    NULL,
    '2024-07-24 17:43:58.236',
    0,
    'dm-38cceb'
  ),
  (
    '7171cb0f-6abc-4923-b015-c3e607f7949e',
    'hi',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 16:59:58.537',
    0,
    'dm-d24967'
  ),
  (
    '898ed129-ae9a-4524-b70d-c3e15f780edb',
    'hi',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 16:19:13.231',
    0,
    'dm-d24967'
  ),
  (
    'a7808e3e-5394-41af-80d5-2b00761c357b',
    'askldjf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:39:23.734',
    0,
    'dm-d24967'
  ),
  (
    'b05c9504-6e19-412d-90f2-23882606a68e',
    '',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/Misc%2Fphoto_11_2024-04-09_11-48-54.jpg?alt=media&token=837fd69e-b12e-462a-bcb8-2d64c6544112',
    '2024-07-24 17:44:07.895',
    0,
    'dm-d24967'
  ),
  (
    'b0acb5c5-4fe0-478d-8160-5b3e25e8bd58',
    'askdfj',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:42:34.456',
    0,
    'dm-d24967'
  ),
  (
    'b897fbc5-94be-4489-9a63-aacde82ad56e',
    'alskdfj\\',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:39:53.580',
    0,
    'dm-d24967'
  ),
  (
    'cf52db06-bd1c-46ba-86e5-b7c5441d0103',
    'hi',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 16:59:53.639',
    0,
    'dm-d24967'
  ),
  (
    'fa2d2a7d-254c-4f46-9cb7-ad4883c49ad6',
    'aslkdfj',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    '2024-07-24 17:38:50.003',
    0,
    'dm-d24967'
  );
/*!40000 ALTER TABLE `ChatMessage` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Comments` (
  `CommentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParentCommentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `View` int NOT NULL DEFAULT '0',
  `Edited` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`CommentID`),
  KEY `Comments_UserID_fkey` (`UserID`),
  KEY `Comments_ParentCommentID_fkey` (`ParentCommentID`),
  KEY `blogpost_fkey` (`ItemID`),
  CONSTRAINT `blogpost_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost` (`BlogID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comments_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comments_ParentCommentID_fkey` FOREIGN KEY (`ParentCommentID`) REFERENCES `Comments` (`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comments_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forumanswer_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer` (`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `DoctorDetails`
--

DROP TABLE IF EXISTS `DoctorDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `DoctorDetails` (
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Speciality` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ConsultationFee` double DEFAULT NULL,
  `EducationalBackground` json DEFAULT NULL,
  `LicenseNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ExperienceYears` int DEFAULT NULL,
  PRIMARY KEY (`DoctorID`),
  KEY `Speciality_index` (`Speciality`),
  CONSTRAINT `DoctorDetails_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `DoctorDetails`
--

LOCK TABLES `DoctorDetails` WRITE;
/*!40000 ALTER TABLE `DoctorDetails` DISABLE KEYS */
;
INSERT INTO `DoctorDetails`
VALUES (
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'neonatology',
    197,
    '\"{\\\"Institution\\\":\\\"BahirDar university\\\",\\\"Degree\\\":\\\"Psychologist\\\",\\\"Specialization\\\":\\\"neonatology\\\",\\\"GraduationYear\\\":2004}\"',
    '1231231231',
    2
  ),
  (
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    'pain_medicine',
    203,
    '\"{\\\"Institution\\\":\\\"Bahirdar University\\\",\\\"Degree\\\":\\\"MBBS\\\",\\\"Specialization\\\":\\\"pain_medicine\\\",\\\"GraduationYear\\\":1999,\\\"AdditionalCertifications\\\":[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"asdfasdf\\\\\\\",\\\\\\\"file\\\\\\\":\\\\\\\"https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/DoctorCertifications%2Fphoto_11_2024-04-09_11-48-54.jpg?alt=media&token=bcbdf46e-0e67-42fe-b6fe-fab93d471ace\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"asdfasdf\\\\\\\",\\\\\\\"issueDate\\\\\\\":\\\\\\\"2024-05-22T00:00:00.000Z\\\\\\\",\\\\\\\"certificateId\\\\\\\":\\\\\\\"laskjdflkjasdf\\\\\\\"}\\\"]}\"',
    '1212112211',
    1
  );
/*!40000 ALTER TABLE `DoctorDetails` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `DoctorReviews`
--

DROP TABLE IF EXISTS `DoctorReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `DoctorReviews` (
  `ReviewID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ReviewerID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Rating` int DEFAULT '0',
  `ReviewText` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `doctor_review_index` (`DoctorID`),
  KEY `DoctorReviews_ReviewerID_fkey` (`ReviewerID`),
  CONSTRAINT `DoctorReviews_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DoctorReviews_ReviewerID_fkey` FOREIGN KEY (`ReviewerID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `DoctorReviews`
--

LOCK TABLES `DoctorReviews` WRITE;
/*!40000 ALTER TABLE `DoctorReviews` DISABLE KEYS */
;
/*!40000 ALTER TABLE `DoctorReviews` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `DoctorSchedule`
--

DROP TABLE IF EXISTS `DoctorSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `DoctorSchedule` (
  `ScheduleID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Date` date DEFAULT NULL,
  `WeekDay` enum(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `ScheduleType` enum('emergency', 'personal', 'normal') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `Status` enum('available', 'unavailable') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `Note` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ScheduleID`),
  KEY `doctor_schedule_index` (`DoctorID`),
  CONSTRAINT `DoctorSchedule_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `DoctorSchedule`
--

LOCK TABLES `DoctorSchedule` WRITE;
/*!40000 ALTER TABLE `DoctorSchedule` DISABLE KEYS */
;
INSERT INTO `DoctorSchedule`
VALUES (
    '05381eec-6198-47eb-885c-e762889c5cc5',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    NULL,
    'sunday',
    '15:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-23 18:23:26.116',
    '2024-07-23 18:25:20.784',
    NULL
  ),
  (
    '06b1e2bb-d7a8-4df7-b310-0d5b022ba9a3',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'friday',
    '14:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-22 18:57:09.577',
    '2024-07-22 19:13:58.178',
    NULL
  ),
  (
    '17ed4133-c370-4d26-a53a-142a2f6b67d9',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'wednesday',
    '14:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-22 18:57:09.574',
    '2024-07-22 19:13:58.178',
    NULL
  ),
  (
    '232a8405-2666-4e6e-a471-2f644c7ae87b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'monday',
    '14:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-22 18:57:09.570',
    '2024-07-22 19:13:58.179',
    NULL
  ),
  (
    '35049521-f792-45f9-af5f-fbd7f2f45023',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-23',
    NULL,
    '22:00:00',
    '22:15:54',
    'normal',
    'unavailable',
    '2024-07-23 17:20:11.536',
    '2024-07-23 17:20:11.536',
    NULL
  ),
  (
    '40b2fbec-7c53-459d-a90f-222178c8c46a',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-23',
    NULL,
    '23:00:00',
    '22:15:58',
    'normal',
    'unavailable',
    '2024-07-23 17:28:02.188',
    '2024-07-23 17:28:02.188',
    NULL
  ),
  (
    '4ef390c1-89b7-4699-aa08-b490e6886291',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-23',
    NULL,
    '19:00:00',
    '22:15:43',
    'normal',
    'unavailable',
    '2024-07-23 13:50:41.654',
    '2024-07-23 13:50:41.654',
    NULL
  ),
  (
    '58b085a2-ed76-4049-ae5d-868b14bf3465',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'tuesday',
    '14:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-22 19:13:58.179',
    '2024-07-22 19:13:58.179',
    NULL
  ),
  (
    '6a139ccf-b498-4443-87bb-c24bcbb03dca',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    NULL,
    'monday',
    '15:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-23 18:23:26.115',
    '2024-07-23 18:25:20.786',
    NULL
  ),
  (
    '78e35549-83dd-4557-a643-0300cb1abd26',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    NULL,
    'friday',
    '15:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-23 18:23:26.116',
    '2024-07-23 18:25:20.796',
    NULL
  ),
  (
    '796f41dc-504b-44a3-a119-c77a57082cfe',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-23',
    NULL,
    '15:00:00',
    '22:15:29',
    'normal',
    'unavailable',
    '2024-07-23 13:48:21.137',
    '2024-07-23 13:48:21.137',
    NULL
  ),
  (
    '7a41b0f1-a9e9-4f2f-8304-c7aab1eb29b5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-22',
    NULL,
    '22:00:00',
    '22:14:28',
    'normal',
    'unavailable',
    '2024-07-22 21:50:52.686',
    '2024-07-22 21:50:52.686',
    NULL
  ),
  (
    '88e7adc8-2643-4fc7-8159-6071296ef340',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    NULL,
    'wednesday',
    '15:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-23 18:23:26.115',
    '2024-07-23 18:25:20.799',
    NULL
  ),
  (
    '90fde71b-e6e2-48ea-9e09-54b679c8c50d',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    '2024-07-23',
    NULL,
    '22:00:00',
    '22:15:54',
    'normal',
    'unavailable',
    '2024-07-23 18:49:37.886',
    '2024-07-23 18:49:37.886',
    NULL
  ),
  (
    'b288fad6-8dc3-4cfb-a87e-51e89e966c97',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    NULL,
    'tuesday',
    '15:00:00',
    '03:00:00',
    'normal',
    'available',
    '2024-07-23 18:25:20.803',
    '2024-07-23 18:25:20.803',
    NULL
  );
/*!40000 ALTER TABLE `DoctorSchedule` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `FAQ`
--

DROP TABLE IF EXISTS `FAQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `FAQ` (
  `FAQID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Question` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Answer` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Order` int NOT NULL DEFAULT '0',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`FAQID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `FAQ`
--

LOCK TABLES `FAQ` WRITE;
/*!40000 ALTER TABLE `FAQ` DISABLE KEYS */
;
/*!40000 ALTER TABLE `FAQ` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Followers`
--

DROP TABLE IF EXISTS `Followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Followers` (
  `FollowerID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FollowingID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FollowersID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`FollowersID`),
  KEY `follower_following_unique` (`FollowerID`, `FollowingID`),
  KEY `Followers_FollowingID_fkey` (`FollowingID`),
  CONSTRAINT `Followers_FollowerID_fkey` FOREIGN KEY (`FollowerID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Followers_FollowingID_fkey` FOREIGN KEY (`FollowingID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Followers`
--

LOCK TABLES `Followers` WRITE;
/*!40000 ALTER TABLE `Followers` DISABLE KEYS */
;
INSERT INTO `Followers`
VALUES (
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-06 07:55:30.688',
    '1801ef18-7ed6-4829-b268-4dd3018b3b55'
  ),
  (
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    '2024-07-06 07:57:59.960',
    '2d29531d-5214-4dc3-b8ae-2105fc7dfbe9'
  ),
  (
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-20 22:26:00.880',
    'a4072732-18a3-4643-9fca-7e7d52bff818'
  ),
  (
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    '2024-07-20 22:26:10.935',
    'eb1b1f57-db86-444e-8183-e6bfdbbd7b22'
  );
/*!40000 ALTER TABLE `Followers` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ForumAnswer`
--

DROP TABLE IF EXISTS `ForumAnswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ForumAnswer` (
  `ForumAnswerID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `ForumPostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Answer` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `View` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ForumAnswerID`),
  KEY `ForumAnswer_ForumPostID_fkey` (`ForumPostID`),
  KEY `ForumAnswer_UserID_fkey` (`UserID`),
  CONSTRAINT `ForumAnswer_ForumPostID_fkey` FOREIGN KEY (`ForumPostID`) REFERENCES `ForumPost` (`ForumPostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ForumAnswer_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ForumAnswer`
--

LOCK TABLES `ForumAnswer` WRITE;
/*!40000 ALTER TABLE `ForumAnswer` DISABLE KEYS */
;
/*!40000 ALTER TABLE `ForumAnswer` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ForumPost`
--

DROP TABLE IF EXISTS `ForumPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ForumPost` (
  `ForumPostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Question` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ForumPostID`),
  KEY `ForumPost_UserID_fkey` (`UserID`),
  CONSTRAINT `ForumPost_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ForumPost`
--

LOCK TABLES `ForumPost` WRITE;
/*!40000 ALTER TABLE `ForumPost` DISABLE KEYS */
;
INSERT INTO `ForumPost`
VALUES (
    'd9d948dc-d8c6-49ef-9bea-a1dbc6c81551',
    '2024-07-10 16:31:52.956',
    '2024-07-10 16:31:52.956',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '<p><img src=\"https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/EditorImage%2F308?alt=media&amp;token=2a4d1de2-9888-4787-8d1d-7360b24bcdb5\" /></p>',
    'Hoajsdlfkjasdkfjasldkfj'
  );
/*!40000 ALTER TABLE `ForumPost` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Likes` (
  `LikeID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `LikeType` enum('like', 'dislike') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'like',
  PRIMARY KEY (`LikeID`),
  KEY `Likes_UserID_idx` (`UserID`),
  KEY `Likes_ItemID_idx` (`ItemID`),
  KEY `Likes_CreatedAt_idx` (`CreatedAt`),
  CONSTRAINT `commet_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments` (`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forum_answer_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer` (`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Likes_ItemID_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Likes_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `MedicalRecord`
--

DROP TABLE IF EXISTS `MedicalRecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `MedicalRecord` (
  `RecordID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfRecord` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Diagnosis` json DEFAULT NULL,
  `Medications` json DEFAULT NULL,
  `Allergies` json DEFAULT NULL,
  PRIMARY KEY (`RecordID`),
  KEY `user_record_index` (`UserID`),
  CONSTRAINT `MedicalRecord_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `MedicalRecord`
--

LOCK TABLES `MedicalRecord` WRITE;
/*!40000 ALTER TABLE `MedicalRecord` DISABLE KEYS */
;
/*!40000 ALTER TABLE `MedicalRecord` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `MemberInVideoChat`
--

DROP TABLE IF EXISTS `MemberInVideoChat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `MemberInVideoChat` (
  `VideoChatRoomID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MemberAuthToken` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MemberID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `MemberInVideoChat_MemberID_fkey` (`MemberID`),
  KEY `MemberInVideoChat_VideoChatRoomID_fkey` (`VideoChatRoomID`),
  CONSTRAINT `MemberInVideoChat_MemberID_fkey` FOREIGN KEY (`MemberID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MemberInVideoChat_VideoChatRoomID_fkey` FOREIGN KEY (`VideoChatRoomID`) REFERENCES `VideoChatRoom` (`RoomID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `MemberInVideoChat`
--

LOCK TABLES `MemberInVideoChat` WRITE;
/*!40000 ALTER TABLE `MemberInVideoChat` DISABLE KEYS */
;
INSERT INTO `MemberInVideoChat`
VALUES (
    '669ffb2a35ff39dcf0614833',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTc2MDU3NywibmJmIjoxNzIxNzU0MDAwLCJleHAiOjE3MjE4NDA0MDAsInJvb21faWQiOiI2NjlmZmIyYTM1ZmYzOWRjZjA2MTQ4MzMiLCJyb2xlIjoiZ3Vlc3QiLCJ1c2VyX2lkIjoiMGJiMjkyZTMtN2U5Mi00ODk5LWJmYTMtZjc1YzNhZGEwN2YzIiwianRpIjoiMWFmOWY3ZDItODE2MC00MGIxLWFhNTktNTk5NzE5Mjk5ZTRiIn0.axumWf27gxSju0JnF8y4XHE2D1RRElnUUNWlL9jJwbE',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '2dd18a8d-88a0-41bd-b32c-45bcf0868a33'
  ),
  (
    '6687b19d70e5a7cdaea564f3',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTc1NTY4MiwibmJmIjoxNzIxNzU3NjAwLCJleHAiOjE3MjE4NDQwMDAsInJvb21faWQiOiI2Njg3YjE5ZDcwZTVhN2NkYWVhNTY0ZjMiLCJyb2xlIjoiZ3Vlc3QiLCJ1c2VyX2lkIjoiMGJiMjkyZTMtN2U5Mi00ODk5LWJmYTMtZjc1YzNhZGEwN2YzIiwianRpIjoiOTdmOTA0OTQtZjVmYS00OTcyLWFmMmQtNzkxZmUxZWE1NmI2In0.15TkgvPTcr6_ROkXfBTDckrNVKFkY45q-1hRnHY7MUI',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'b8213e9a-1a31-4593-93d6-5e89bd873d37'
  );
/*!40000 ALTER TABLE `MemberInVideoChat` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Notification` (
  `NotificationID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `NotificationType` enum(
    'newAppointment',
    'cancelAppointment',
    'acceptAppointment',
    'rescheduleAppointment',
    'newChat',
    'newVideoCall',
    'newPost',
    'newForumQuestion',
    'newForumAnswer',
    'newComment'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ReadAt` datetime(3) DEFAULT NULL,
  `Status` enum('read', 'unread') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  PRIMARY KEY (`NotificationID`),
  KEY `Notification_UserID_fkey` (`UserID`),
  CONSTRAINT `Notification_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */
;
INSERT INTO `Notification`
VALUES (
    '02495631-b58d-4831-a6ee-53bd029ae2e3',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-29 12:00 PM ',
    '2024-07-20 22:19:46.435',
    '2024-07-21 00:34:13.841',
    'cancelAppointment',
    '2024-07-21 00:34:13.813',
    'read'
  ),
  (
    '047c3801-24db-4fa3-aa5a-3cbe04d6181c',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 06:00 PM ',
    '2024-07-22 21:50:52.725',
    '2024-07-22 21:50:52.725',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '08958354-079f-406b-bad7-6ae14692d2ad',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 19:55:25.618',
    '2024-07-22 19:55:25.618',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '094cb216-326b-42ce-8a57-7b23f570ba94',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-21 03:00 PM ',
    '2024-07-21 19:34:20.708',
    '2024-07-21 19:34:20.708',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '0985005f-9392-4578-ad27-63fa641cd503',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:41:00.805',
    '2024-07-23 13:41:00.805',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '0d5610a8-e2aa-43df-8065-d8ea7729ee5e',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:31:47.810',
    '2024-07-23 13:31:47.810',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '10eb81cd-ff04-4343-8da8-e412922a4092',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-21 04:00 PM ',
    '2024-07-22 06:17:08.874',
    '2024-07-22 06:17:08.874',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '11147f19-809f-4e20-865f-1038eb72d05b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.997',
    '2024-07-23 15:15:53.997',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '13dd7e07-4eb1-4e34-9918-3558f10684de',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 07:00 PM ',
    '2024-07-23 17:28:02.292',
    '2024-07-23 17:28:02.292',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '16ace101-3cab-4912-a1df-3a0208c8ae92',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-21 03:00 PM ',
    '2024-07-21 18:48:01.662',
    '2024-07-21 18:48:01.662',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '182188b2-21a0-4933-8b75-f922aecb0471',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 20:10:23.908',
    '2024-07-22 05:44:21.541',
    'newAppointment',
    '2024-07-22 05:44:21.516',
    'read'
  ),
  (
    '1af32c6c-ff02-4991-8cbf-532b8bf949d2',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.412',
    '2024-07-23 15:16:03.412',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '25124f15-989b-4bb5-8a11-097fe23842a1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-22 10:00 AM ',
    '2024-07-22 06:17:02.398',
    '2024-07-22 06:17:02.398',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '2641662c-f8ae-4c05-86ec-ffbd990eea77',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    'dawit abebe has requested new appointment',
    '2024-07-23 18:49:14.971',
    '2024-07-23 18:49:14.971',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '31695bbd-766b-458c-b67c-5720b409823e',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-21 10:00 PM ',
    '2024-07-21 20:18:46.406',
    '2024-07-21 20:18:46.406',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '32101e6a-4d82-4747-8fc9-3f5904038915',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.585',
    '2024-07-23 01:43:41.585',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '35941241-9fe6-4e7a-a545-28cab62a18ec',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.415',
    '2024-07-23 15:16:03.415',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '36593ede-552b-488f-bca3-4f8949886ff0',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-22 09:00 AM ',
    '2024-07-22 06:20:47.464',
    '2024-07-22 06:20:47.464',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '39e03663-f2d2-4073-9f36-761124927387',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-31 01:00 PM ',
    '2024-07-20 22:36:29.768',
    '2024-07-21 00:33:01.692',
    'acceptAppointment',
    '2024-07-21 00:33:01.679',
    'read'
  ),
  (
    '3a33be8f-76f9-48e9-aecf-8ade58d5fcba',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-30 10:00 AM ',
    '2024-07-22 06:20:34.657',
    '2024-07-22 06:20:34.657',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '3d96c21d-7a51-40dd-ae5e-c67c82cac842',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 12:45 PM ',
    '2024-07-21 18:21:32.960',
    '2024-07-21 18:21:32.960',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '4d788aea-829e-4f78-995b-1f20e9173f6c',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 18:40:52.622',
    '2024-07-22 05:44:23.826',
    'newAppointment',
    '2024-07-22 05:44:23.814',
    'read'
  ),
  (
    '4dbafe8c-e237-4459-bae2-75c698cb9929',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 19:08:33.770',
    '2024-07-22 19:08:33.770',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '4f4a7644-7c93-47dd-8fad-f59c3712e8f8',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 20:12:01.993',
    '2024-07-22 05:44:15.093',
    'newAppointment',
    '2024-07-22 05:44:15.068',
    'read'
  ),
  (
    '50993bcc-7833-4bf0-9316-5a40e774e382',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dawit abebe  Accepted your Appointment scheduled for 2024-07-22 12:45 PM ',
    '2024-07-21 18:15:33.325',
    '2024-07-21 18:15:33.325',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '561ad931-1f9a-4a42-a77f-7bf4d136c50c',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.586',
    '2024-07-23 01:43:41.586',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '56df3ee7-71df-4065-a611-8ed80b0dda01',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-23 11:00 AM ',
    '2024-07-23 13:47:08.702',
    '2024-07-23 13:47:08.702',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '5711ccc3-f390-406d-b417-220b421d79e6',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-22 12:45 PM ',
    '2024-07-21 18:14:35.570',
    '2024-07-21 18:14:35.570',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '5a11bddf-6604-4c39-b4f1-d53e08c1aebd',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-23 12:00 PM ',
    '2024-07-23 13:47:15.716',
    '2024-07-23 13:47:15.716',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '5afcdc31-ca83-4763-bdce-9429106ab9ec',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 07:04:52.198',
    '2024-07-22 07:04:52.198',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '5dd74629-99a0-4344-8cb8-cdc3dcb6441d',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 20:12:33.032',
    '2024-07-22 05:44:11.541',
    'newAppointment',
    '2024-07-22 05:44:11.529',
    'read'
  ),
  (
    '5defea4a-1667-4915-8535-1b7fbc38b1e7',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 18:38:02.470',
    '2024-07-22 05:44:26.090',
    'newAppointment',
    '2024-07-22 05:44:26.077',
    'read'
  ),
  (
    '5fbdaefe-82a2-4563-8511-c39cd6bc8fb8',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 10:00 AM ',
    '2024-07-22 07:05:28.061',
    '2024-07-22 07:05:28.061',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '606f78bf-cb15-4e36-b2fa-a1d6c412921e',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-20 22:35:21.704',
    '2024-07-21 00:26:33.868',
    'newAppointment',
    '2024-07-21 00:26:33.834',
    'read'
  ),
  (
    '6185eb11-bba9-4428-b4fe-4bc4c1712aaf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 20:11:10.798',
    '2024-07-22 05:44:18.125',
    'newAppointment',
    '2024-07-22 05:44:18.119',
    'read'
  ),
  (
    '61ce1939-e7d7-41e9-b60c-ff83a3303606',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.415',
    '2024-07-23 15:16:03.415',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '6447fb8e-5b51-434f-babd-82ca23d37409',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.417',
    '2024-07-23 15:16:03.417',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '6688f7dd-566a-41c3-90cd-5e735c209ac0',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.997',
    '2024-07-23 15:15:53.997',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '67e8eab8-e5cd-4d2a-b1e6-e942209e11f7',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dawit abebe  Accepted your Appointment scheduled for 2024-07-21 03:00 PM ',
    '2024-07-21 18:48:16.621',
    '2024-07-21 18:48:16.621',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '69ca0814-3862-4a9d-927a-6d15f68a272a',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-23 11:00 AM ',
    '2024-07-23 13:47:12.046',
    '2024-07-23 13:47:12.046',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '6a831ff9-4127-400d-8abe-7e822f0e4ef7',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-20 22:16:44.532',
    '2024-07-21 00:29:49.730',
    'newAppointment',
    '2024-07-21 00:29:49.716',
    'read'
  ),
  (
    '6dbf0205-6f42-498e-99b8-7d5e602372e3',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.585',
    '2024-07-23 01:43:41.585',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '6f63bc13-f588-4264-b8f5-4e099c240772',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-21 03:00 AM ',
    '2024-07-21 18:38:17.702',
    '2024-07-21 18:38:17.702',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '6f909117-dd60-49ed-9109-7ab6635d697b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-20 22:34:37.683',
    '2024-07-21 00:27:17.439',
    'newAppointment',
    '2024-07-21 00:27:17.395',
    'read'
  ),
  (
    '6fa2182a-35ed-4b64-bf4f-ea544be0e707',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-21 11:00 AM ',
    '2024-07-21 18:36:49.309',
    '2024-07-21 18:36:49.309',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '72b18f97-4afd-4af9-9b49-2eadffb213eb',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.417',
    '2024-07-23 15:16:03.417',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '72e501dc-a0f1-4bc4-acd8-104e62176a78',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 07:21:13.251',
    '2024-07-22 07:21:13.251',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '744efc41-c7ed-468e-aa11-831c49ee1963',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 05:00 AM ',
    '2024-07-22 18:36:29.010',
    '2024-07-22 18:36:29.010',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '76fcc108-6df1-4e7f-9349-629e4856af5f',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 07:15:45.877',
    '2024-07-22 07:15:45.877',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7a9ca3bc-ab4e-456f-89ff-9fb2cd65b797',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 19:00:36.514',
    '2024-07-22 19:00:36.514',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7aacd38f-acd1-4d79-a81d-f686d1622894',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-22 04:00 PM ',
    '2024-07-24 17:55:37.863',
    '2024-07-24 17:55:37.863',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '7c93f821-b67d-481f-b122-f45f71805c1b',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-22 09:00 PM ',
    '2024-07-24 17:54:14.119',
    '2024-07-24 17:54:14.119',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '7e7ab0ab-c742-449b-a50c-f839c527189d',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 17:27:50.667',
    '2024-07-23 17:27:50.667',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7f79eaf4-fa67-4c99-8bf8-81ecc08ed917',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 04:00 PM ',
    '2024-07-22 19:00:47.324',
    '2024-07-22 19:00:47.324',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '7fdbca20-24b6-431e-a270-a60afc87a9f7',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-21 08:00 PM ',
    '2024-07-21 20:17:21.864',
    '2024-07-21 20:17:21.864',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '804cee44-5838-4319-9f6b-e6d82794b533',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 06:00 PM ',
    '2024-07-21 20:17:17.906',
    '2024-07-21 20:17:17.906',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '85d17296-4e4f-4424-a73b-d16550fc5cc5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:50:29.658',
    '2024-07-23 13:50:29.658',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '869dd56d-0346-45af-9fff-682ed1c12e22',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . abebe patient  Accepted your Appointment scheduled for 2024-07-23 06:00 PM ',
    '2024-07-23 18:49:38.010',
    '2024-07-23 18:49:38.010',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '88a7c11a-888f-47a9-abad-e7eb9df88f45',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-24 11:00 AM ',
    '2024-07-23 13:47:18.948',
    '2024-07-23 13:47:18.948',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '8a445589-4c00-40df-b78f-e5b78f05e9b6',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.997',
    '2024-07-23 15:15:53.997',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '8a4fc785-1db9-4b13-a973-54fa86fe8d31',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.999',
    '2024-07-23 15:15:53.999',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '8b1fc3a5-282e-4cb5-822e-8e8be4d49373',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-24 11:00 AM ',
    '2024-07-23 13:38:33.208',
    '2024-07-23 13:38:33.208',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '8c3731d0-3da4-47f0-8c0f-e379170a0ead',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Rescheduled the  appointment scheduled for 2024-07-29 01:45 PM ',
    '2024-07-21 14:39:33.425',
    '2024-07-21 14:39:49.194',
    'cancelAppointment',
    '2024-07-21 14:39:49.165',
    'read'
  ),
  (
    '8ed92c47-ff16-49ef-83e3-964d877681f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 08:00 PM ',
    '2024-07-22 07:03:40.718',
    '2024-07-22 07:03:40.718',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '8f522ece-55a3-4a5c-892d-83835804c35d',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 02:00 PM ',
    '2024-07-22 19:09:18.032',
    '2024-07-22 19:09:18.032',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '90a7a25f-2a7a-4f76-951a-e82e26af4faf',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 21:50:08.212',
    '2024-07-22 21:50:08.212',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '928ceee6-1a04-430f-9886-c29fb9e55ef9',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.586',
    '2024-07-23 01:43:41.586',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    '9454251e-062a-4f84-9572-42381bfd90f9',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 01:00 AM ',
    '2024-07-22 07:03:44.490',
    '2024-07-22 07:03:44.490',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '9827b7e1-33bd-4b90-bec7-08e6f8bf9ff6',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 17:19:45.814',
    '2024-07-23 17:19:45.814',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '9a9dec79-2b81-4fd7-a334-65c6383984a2',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-30 08:00 AM ',
    '2024-07-21 20:17:25.043',
    '2024-07-21 20:17:25.043',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '9e0008d1-154f-4114-bf36-13a4e96d450f',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 08:00 PM ',
    '2024-07-21 20:17:14.450',
    '2024-07-21 20:17:14.450',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '9e25eda8-e17d-43b7-8d13-abdc0603d936',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 20:23:32.051',
    '2024-07-22 05:44:07.238',
    'newAppointment',
    '2024-07-22 05:44:07.197',
    'read'
  ),
  (
    '9f621238-fb57-4854-8a22-73e743389456',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 09:00 PM ',
    '2024-07-22 21:52:25.080',
    '2024-07-22 21:52:25.080',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    '9fc02da9-9510-4410-aac4-654d1bee379a',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.414',
    '2024-07-23 15:16:03.414',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'a198597a-7910-4186-bdbb-90a38714a188',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-31 12:00 PM ',
    '2024-07-20 22:20:39.110',
    '2024-07-21 00:33:25.545',
    'cancelAppointment',
    '2024-07-21 00:33:25.516',
    'read'
  ),
  (
    'a2c6a838-2147-49e2-9be5-f401ce16a327',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:42:16.810',
    '2024-07-23 13:42:16.810',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'a533972b-f0ea-46fa-942f-d61fc047539a',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dawit abebe  Accepted your Appointment scheduled for 2024-07-21 10:00 PM ',
    '2024-07-21 20:19:26.047',
    '2024-07-21 20:19:26.047',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'a53f81ac-741d-44a7-80de-fd03a3236efc',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 04:00 PM ',
    '2024-07-22 21:50:59.573',
    '2024-07-22 21:50:59.573',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'aa38b922-1cfc-4fd0-82e8-396082c5e3d4',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:43:15.038',
    '2024-07-23 13:43:15.038',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'aecd4489-0881-4dc9-8577-1980352d8cd9',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 18:24:01.236',
    '2024-07-21 18:24:18.696',
    'newAppointment',
    '2024-07-21 18:24:18.687',
    'read'
  ),
  (
    'b05b3b2a-7173-4ec1-9726-a42f00d019e1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-21 04:00 PM ',
    '2024-07-21 20:23:50.119',
    '2024-07-21 20:23:50.119',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'b24c403d-2321-4f97-9925-2b8b0b3eb0e7',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-23 13:48:10.107',
    '2024-07-23 13:48:10.107',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'b2db6261-20d5-44a2-be54-f21f8cac0855',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-29 01:00 PM ',
    '2024-07-20 22:36:41.900',
    '2024-07-21 00:32:10.821',
    'acceptAppointment',
    '2024-07-21 00:32:10.789',
    'read'
  ),
  (
    'b3f3fdcd-b0cd-4eb9-b57b-6e0f278938b4',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 01:00 AM ',
    '2024-07-22 06:46:57.540',
    '2024-07-22 06:46:57.540',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'b5a455d0-80da-4e89-a879-a682cceb136f',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.997',
    '2024-07-23 15:15:53.997',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'b625fb7d-cda8-48ed-80b7-c853f46c16ec',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.586',
    '2024-07-23 01:43:56.528',
    'newVideoCall',
    '2024-07-23 01:43:56.457',
    'read'
  ),
  (
    'b87e6253-8624-4e7b-bd36-73f5ab8b72ea',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 18:35:59.844',
    '2024-07-22 05:44:31.773',
    'newAppointment',
    '2024-07-22 05:44:31.746',
    'read'
  ),
  (
    'b960a6ed-ae68-4fbd-9b5a-e6453ea57b74',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-21 18:26:02.795',
    '2024-07-22 05:44:34.728',
    'newAppointment',
    '2024-07-22 05:44:34.720',
    'read'
  ),
  (
    'bae15188-b275-44ed-83ec-37c0fcee9d1f',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-29 12:00 PM ',
    '2024-07-20 22:17:13.593',
    '2024-07-21 00:36:19.982',
    'acceptAppointment',
    '2024-07-21 00:36:19.970',
    'read'
  ),
  (
    'bb5453d5-1efa-474c-a796-7e1e02cac6a8',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.998',
    '2024-07-23 15:15:53.998',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'c13dd098-c4e3-40f3-9774-d44045e08a7b',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-21 04:00 AM ',
    '2024-07-22 06:17:06.317',
    '2024-07-22 06:17:06.317',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'c2691544-afa1-4e92-a250-f1f8e80eb579',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 03:00 PM ',
    '2024-07-23 13:50:41.702',
    '2024-07-23 13:50:41.702',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'c39218dc-5354-4d47-b903-dea0c0380b21',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 09:00 PM',
    '2024-07-23 01:43:41.582',
    '2024-07-23 01:43:41.582',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'c6c0c94a-a1b2-42e4-a488-5d8d5527abc8',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 12:00 PM ',
    '2024-07-23 13:43:26.200',
    '2024-07-23 13:43:26.200',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'caa3c52e-23b5-46db-ade6-dfdb4a47985a',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 10:00 AM ',
    '2024-07-22 07:17:48.329',
    '2024-07-22 07:17:48.329',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'cc013c4c-0e69-4998-b721-dcb2285d3075',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 08:00 PM ',
    '2024-07-22 07:03:09.154',
    '2024-07-22 07:03:09.154',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'd34a0d2e-4b7c-4fad-86f2-e0e262d8a9ad',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.415',
    '2024-07-23 15:16:03.415',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'd53ed513-905a-43e3-ba0e-f9caa7fee19b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 06:46:34.173',
    '2024-07-22 06:46:34.173',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'd6e484f8-dfd9-4024-b692-2f5ec5da95b1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-21 08:00 PM ',
    '2024-07-21 18:41:09.961',
    '2024-07-21 18:41:09.961',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'dae88c69-9432-4fd0-801d-6434537ca936',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 05:00 AM ',
    '2024-07-22 07:21:36.519',
    '2024-07-22 07:21:36.519',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'db929f96-1521-456d-ac12-904407c4e70a',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 21:52:00.180',
    '2024-07-22 21:52:00.180',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'dd75925d-0d45-477b-85fa-e5d32e105655',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-21 11:00 AM ',
    '2024-07-21 18:37:09.342',
    '2024-07-21 18:37:09.342',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'df3a6870-595a-48db-ba70-9076479491ec',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-21 03:00 AM ',
    '2024-07-21 18:40:17.173',
    '2024-07-21 18:40:17.173',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'e5e73711-e955-4007-90d2-3e6ac87d4643',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 11:00 AM ',
    '2024-07-23 13:48:21.169',
    '2024-07-23 13:48:21.169',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'e651143d-defe-48a8-b3fa-0d6a2e9823a5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:54.002',
    '2024-07-23 15:15:54.002',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'eb2306d7-f054-4fa7-97a3-db025d355a12',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'surafel getaneh has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:16:03.416',
    '2024-07-23 15:16:03.416',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'edd35c7e-4d05-41bc-be40-58ea7a93be64',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'dawit abebe  Accepted your Appointment scheduled for 2024-07-29 01:45 PM ',
    '2024-07-21 14:40:25.074',
    '2024-07-21 14:40:25.074',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'efa951b4-99b3-41c8-ae34-6164f3139238',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 11:00 AM ',
    '2024-07-23 13:41:18.608',
    '2024-07-23 13:41:18.608',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'f3e59778-4ada-46af-8e24-719ad21738ee',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-22 07:02:21.472',
    '2024-07-22 07:02:21.472',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'f4475b9b-567c-42a2-8c7c-70398467dd7f',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-22 04:00 PM ',
    '2024-07-22 07:16:07.450',
    '2024-07-22 07:16:07.450',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'f6533b1a-4a0e-4562-ac31-95f8f54d4670',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' Dr . surafel getaneh  Accepted your Appointment scheduled for 2024-07-23 11:00 AM ',
    '2024-07-23 13:42:31.502',
    '2024-07-23 13:42:31.502',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'f678dfe5-c963-4859-a6c8-c87f9c3ff346',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    ' dawit abebe Cancelled appointment scheduled for 2024-07-22 10:00 AM ',
    '2024-07-22 06:21:22.678',
    '2024-07-22 06:21:22.678',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'fb187727-9799-4719-9869-de50faf0db4a',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has started Video call session  scheduled for 11:00 AM',
    '2024-07-23 15:15:53.998',
    '2024-07-23 15:15:53.998',
    'newVideoCall',
    NULL,
    'unread'
  ),
  (
    'ff899d0a-66b3-41fa-9658-ce41a64e4951',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-22 04:00 PM ',
    '2024-07-22 07:17:52.272',
    '2024-07-22 07:17:52.272',
    'cancelAppointment',
    NULL,
    'unread'
  );
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Payment` (
  `PaymentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Amount` double NOT NULL,
  `PaymentDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `PaymentMethod` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppointmentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentStatus` enum('pending', 'completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`PaymentID`),
  UNIQUE KEY `Payment_AppointmentID_key` (`AppointmentID`),
  KEY `doctor_payment_index` (`DoctorID`),
  KEY `Payment_PatientID_fkey` (`PatientID`),
  CONSTRAINT `Payment_AppointmentID_fkey` FOREIGN KEY (`AppointmentID`) REFERENCES `Appointments` (`AppointmentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Payment_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Payment_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Post` (
  `PostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `View` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`PostID`),
  KEY `Post_DoctorID_fkey` (`DoctorID`),
  CONSTRAINT `Post_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `PostMedia`
--

DROP TABLE IF EXISTS `PostMedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `PostMedia` (
  `MediaID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CommentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MediaType` enum('video', 'image') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `URL` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ForumAnswerID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ContentType` enum('forumAnswer', 'post', 'comment', 'blog') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  PRIMARY KEY (`MediaID`),
  KEY `PostMedia_PostID_fkey` (`PostID`),
  KEY `PostMedia_CommentID_fkey` (`CommentID`),
  KEY `PostMedia_ForumAnswerID_fkey` (`ForumAnswerID`),
  CONSTRAINT `PostMedia_CommentID_fkey` FOREIGN KEY (`CommentID`) REFERENCES `Comments` (`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostMedia_ForumAnswerID_fkey` FOREIGN KEY (`ForumAnswerID`) REFERENCES `ForumAnswer` (`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostMedia_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `PostMedia`
--

LOCK TABLES `PostMedia` WRITE;
/*!40000 ALTER TABLE `PostMedia` DISABLE KEYS */
;
/*!40000 ALTER TABLE `PostMedia` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Prescription`
--

DROP TABLE IF EXISTS `Prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Prescription` (
  `PrescriptionID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `IssuedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ValidUntil` datetime(3) DEFAULT NULL,
  `Status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`PrescriptionID`),
  KEY `Prescription_DoctorID_fkey` (`DoctorID`),
  KEY `Prescription_PatientID_fkey` (`PatientID`),
  CONSTRAINT `Prescription_DoctorID_fkey` FOREIGN KEY (`DoctorID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Prescription_PatientID_fkey` FOREIGN KEY (`PatientID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Prescription`
--

LOCK TABLES `Prescription` WRITE;
/*!40000 ALTER TABLE `Prescription` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Prescription` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `PrescriptionAttachment`
--

DROP TABLE IF EXISTS `PrescriptionAttachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `PrescriptionAttachment` (
  `AttachmentID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PrescriptionID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `URL` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Filename` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Size` int NOT NULL,
  `Caption` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileType` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`AttachmentID`),
  KEY `PrescriptionAttachment_PrescriptionID_fkey` (`PrescriptionID`),
  CONSTRAINT `PrescriptionAttachment_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription` (`PrescriptionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `PrescriptionAttachment`
--

LOCK TABLES `PrescriptionAttachment` WRITE;
/*!40000 ALTER TABLE `PrescriptionAttachment` DISABLE KEYS */
;
/*!40000 ALTER TABLE `PrescriptionAttachment` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `PrescriptionItem`
--

DROP TABLE IF EXISTS `PrescriptionItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `PrescriptionItem` (
  `PrescriptionItemID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PrescriptionID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MedicationName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Dosage` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Instructions` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Frequency` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Duration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`PrescriptionItemID`),
  KEY `PrescriptionItem_PrescriptionID_fkey` (`PrescriptionID`),
  CONSTRAINT `PrescriptionItem_PrescriptionID_fkey` FOREIGN KEY (`PrescriptionID`) REFERENCES `Prescription` (`PrescriptionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `PrescriptionItem`
--

LOCK TABLES `PrescriptionItem` WRITE;
/*!40000 ALTER TABLE `PrescriptionItem` DISABLE KEYS */
;
/*!40000 ALTER TABLE `PrescriptionItem` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Reply`
--

DROP TABLE IF EXISTS `Reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Reply` (
  `ReplyID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FeedbackID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ReplyID`),
  KEY `Reply_FeedbackID_fkey` (`FeedbackID`),
  KEY `Reply_UserID_fkey` (`UserID`),
  CONSTRAINT `Reply_FeedbackID_fkey` FOREIGN KEY (`FeedbackID`) REFERENCES `UserFeedback` (`FeedbackID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reply_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Reply`
--

LOCK TABLES `Reply` WRITE;
/*!40000 ALTER TABLE `Reply` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Reply` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Report`
--

DROP TABLE IF EXISTS `Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Report` (
  `ReportID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`ReportID`),
  KEY `Report_UserID_fkey` (`UserID`),
  KEY `report_comment_fkey` (`ItemID`),
  CONSTRAINT `report_blog_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost` (`BlogID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `report_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments` (`CommentID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `report_post_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Post` (`PostID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Report_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Report`
--

LOCK TABLES `Report` WRITE;
/*!40000 ALTER TABLE `Report` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Report` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Share`
--

DROP TABLE IF EXISTS `Share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Share` (
  `ShareID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Platform` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SharedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ShareID`),
  KEY `Share_PostID_fkey` (`PostID`),
  CONSTRAINT `Share_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post` (`PostID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Share`
--

LOCK TABLES `Share` WRITE;
/*!40000 ALTER TABLE `Share` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Share` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Transaction` (
  `TransactionID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `WalletID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Amount` double NOT NULL,
  `Type` enum('debit', 'credit') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `transaction_wallet_index` (`WalletID`),
  CONSTRAINT `Transaction_WalletID_fkey` FOREIGN KEY (`WalletID`) REFERENCES `Wallet` (`WalletID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `UserFeedback`
--

DROP TABLE IF EXISTS `UserFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `UserFeedback` (
  `FeedbackID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `Type` enum(
    'generalFeedback',
    'question',
    'review',
    'enquiry'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'generalFeedback',
  `Rating` int DEFAULT NULL,
  `Review` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `UserFeedback_UserID_fkey` (`UserID`),
  CONSTRAINT `UserFeedback_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `UserFeedback`
--

LOCK TABLES `UserFeedback` WRITE;
/*!40000 ALTER TABLE `UserFeedback` DISABLE KEYS */
;
/*!40000 ALTER TABLE `UserFeedback` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Users` (
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FirstName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfBirth` datetime(3) DEFAULT NULL,
  `Gender` enum('male', 'female') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Bio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `PhoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProfilePicture` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` enum(
    'doctor',
    'patient',
    'admin',
    'moderator',
    'organization'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` enum(
    'active',
    'inactive',
    'suspended',
    'blocked',
    'deleted'
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Verified` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `LastLogin` datetime(3) DEFAULT NULL,
  `Password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Users_Email_key` (`Email`),
  KEY `email_index` (`Email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */
;
INSERT INTO `Users`
VALUES (
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'DawitDoc',
    'dawit',
    'abebe',
    'abebewondwosen3@gmail.com',
    '2000-02-26 00:00:00.000',
    'male',
    NULL,
    '0913176534',
    NULL,
    'https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/UserProfilePictures%2Fphoto_13_2024-04-09_11-48-54.jpg?alt=media&token=7af3b8ef-7416-4f27-ac7a-00e00c1228fe',
    'patient',
    'active',
    1,
    '2024-06-27 22:53:14.131',
    '2024-07-24 19:59:43.620',
    '2024-07-04 13:15:48.903',
    '3e756c0e54c00afa8728e06f520e257b841c7e46188327a91c8d64cd5d49ffefc411d7d0529ab4570c8c6ccb0ff24aea0c549dfab7430799c24ae81fa44ad2e4'
  ),
  (
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'surafelGet',
    'surafel',
    'getaneh',
    'dawitgem@gmail.com',
    '1996-05-28 00:00:00.000',
    'male',
    NULL,
    '0913176534',
    NULL,
    NULL,
    'doctor',
    'active',
    1,
    '2024-06-28 22:55:14.289',
    '2024-07-24 05:49:05.128',
    '2024-07-24 05:49:05.127',
    '3e756c0e54c00afa8728e06f520e257b841c7e46188327a91c8d64cd5d49ffefc411d7d0529ab4570c8c6ccb0ff24aea0c549dfab7430799c24ae81fa44ad2e4'
  ),
  (
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    'Abebe',
    'abebe',
    'patient',
    'healthlinkapp.info@gmail.com',
    '2001-01-26 00:00:00.000',
    'male',
    NULL,
    '+251913176534',
    NULL,
    NULL,
    'doctor',
    'active',
    1,
    '2024-07-04 09:08:23.800',
    '2024-07-24 18:57:00.653',
    '2024-07-24 07:17:36.664',
    '3e756c0e54c00afa8728e06f520e257b841c7e46188327a91c8d64cd5d49ffefc411d7d0529ab4570c8c6ccb0ff24aea0c549dfab7430799c24ae81fa44ad2e4'
  );
/*!40000 ALTER TABLE `Users` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `VideoChatRoom`
--

DROP TABLE IF EXISTS `VideoChatRoom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `VideoChatRoom` (
  `RoomID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `HostAuthToken` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `HostID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`RoomID`),
  KEY `host_index` (`HostID`),
  CONSTRAINT `VideoChatRoom_HostID_fkey` FOREIGN KEY (`HostID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `VideoChatRoom`
--

LOCK TABLES `VideoChatRoom` WRITE;
/*!40000 ALTER TABLE `VideoChatRoom` DISABLE KEYS */
;
INSERT INTO `VideoChatRoom`
VALUES (
    '6687b19d70e5a7cdaea564f3',
    '1b6-k98-3yq',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTc1NTY4MiwibmJmIjoxNzIxNzU3NjAwLCJleHAiOjE3MjE4NDQwMDAsInJvb21faWQiOiI2Njg3YjE5ZDcwZTVhN2NkYWVhNTY0ZjMiLCJyb2xlIjoiaG9zdCIsInVzZXJfaWQiOiIzMjY2M2UyZi03NzU3LTQ0OGUtYjgwNy1lZjFkMGY3MTIzZjEiLCJqdGkiOiIyZDkzZDdmYi02Yzk0LTRmNTItODkzYi04ZjBjMjQ5OTc3ODAifQ.gPO9QbGKm_CFJYRy5nQDbttDhXm0m_5279h_JbX7lY0',
    '2024-07-05 08:41:02.287',
    '2024-07-23 17:28:02.220',
    '32663e2f-7757-448e-b807-ef1d0f7123f1'
  ),
  (
    '669ffb2a35ff39dcf0614833',
    'rjb-c1y-3m1',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTc2MDU3NywibmJmIjoxNzIxNzU0MDAwLCJleHAiOjE3MjE4NDA0MDAsInJvb21faWQiOiI2NjlmZmIyYTM1ZmYzOWRjZjA2MTQ4MzMiLCJyb2xlIjoiaG9zdCIsInVzZXJfaWQiOiI3M2FmMGZkMi1jNWE2LTQ4MjUtOWE4YS0zMTkxZTA1ZDk2NTAiLCJqdGkiOiIxMmRkZTk3MS01YzBhLTQ0Y2ItYTYyNi02MjJlNmY0ZjEyZWIifQ.FoL5RfcGSs1jEUfv6WfOiL-_hdcb906JtN_7oqJuf8A',
    '2024-07-23 18:49:14.914',
    '2024-07-23 18:49:37.910',
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650'
  );
/*!40000 ALTER TABLE `VideoChatRoom` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `Wallet`
--

DROP TABLE IF EXISTS `Wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Wallet` (
  `WalletID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Balance` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`WalletID`),
  KEY `wallet_user_index` (`UserID`),
  CONSTRAINT `Wallet_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `Wallet`
--

LOCK TABLES `Wallet` WRITE;
/*!40000 ALTER TABLE `Wallet` DISABLE KEYS */
;
/*!40000 ALTER TABLE `Wallet` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */
;
INSERT INTO `_prisma_migrations`
VALUES (
    'e3470bf2-55e3-489e-bc81-763d2b521a13',
    'a7a72f7fac77101542849c3bf09d1570f359a2da10876a5ec224c9733dcccfae',
    NULL,
    '20240723184454_backup_migration',
    'A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20240723184454_backup_migration\n\nDatabase error code: 1050\n\nDatabase error:\nTable \'Users\' already exists\n\nPlease check the query number 1 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20240723184454_backup_migration\"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20240723184454_backup_migration\"\n             at schema-engine/core/src/commands/apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:202',
    NULL,
    '2024-07-24 05:36:39.553',
    0
  );
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2024-07-24 16:07:58