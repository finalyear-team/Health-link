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
  `AppointmentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ScheduleID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `AppointmentDate` date NOT NULL,
  `AppointmentTime` time NOT NULL,
  `Duration` int DEFAULT NULL,
  `Status` enum(
    'pending',
    'overdue',
    'booked',
    'completed',
    'cancelled'
  ) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `AppointmentType` enum('initialConsultation', 'followup', 'emergency') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'initialConsultation',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `CancelledBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CancelledReason` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VideoChatRoomID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Note` text COLLATE utf8mb4_unicode_ci,
  `UpdatedBy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  CONSTRAINT `Appointments_ScheduleID_fkey` FOREIGN KEY (`ScheduleID`) REFERENCES `DoctorSchedule` (`ScheduleID`) ON DELETE CASCADE ON UPDATE CASCADE,
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
    '13731829-c487-45fd-b47d-bc9cca10a500',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-19',
    '06:00:00',
    1,
    'overdue',
    'initialConsultation',
    '2024-07-12 16:15:37.414',
    '2024-07-19 17:02:09.114',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '2294f060-917f-45fd-9651-4fa36defb9dd',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 21:40:00.474',
    '2024-07-18 22:26:18.199',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'alskdjflkasdf',
    '6687b19d70e5a7cdaea564f3',
    'please work',
    NULL
  ),
  (
    '2358bcda-23f5-4815-8117-e79b22969213',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '09:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 21:35:57.675',
    '2024-07-18 21:39:18.321',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'sdf',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '29bfddc1-a9b9-496b-a473-dd82b099d027',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-15 10:43:29.056',
    '2024-07-18 20:34:27.057',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'another one',
    '6687b19d70e5a7cdaea564f3',
    'please work',
    NULL
  ),
  (
    '3dce3d19-4fbb-4ddf-be4c-e7004f3e1e0e',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '14:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-15 10:44:34.496',
    '2024-07-18 20:34:54.921',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'why',
    '6687b19d70e5a7cdaea564f3',
    'alskdflaksjdlfkj',
    NULL
  ),
  (
    '473080a4-f32e-450d-b1ce-ca7b84621a94',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-12',
    '14:00:00',
    3,
    'overdue',
    'initialConsultation',
    '2024-07-05 14:58:26.212',
    '2024-07-19 17:02:09.114',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first check up',
    NULL
  ),
  (
    '4c93a1e2-5ea4-4ce6-8961-f4bb7a6e6a67',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 22:27:26.626',
    '2024-07-18 22:27:53.558',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'askldflkjsd',
    '6687b19d70e5a7cdaea564f3',
    'come on man',
    NULL
  ),
  (
    '5a8c8328-69b6-4586-85e9-54da3c30ffca',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 23:04:21.814',
    '2024-07-18 23:04:43.453',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'another one',
    '6687b19d70e5a7cdaea564f3',
    'alskdflaksjdlfkj',
    NULL
  ),
  (
    '73e07a8f-aae8-4fd2-85f2-4f25465eb694',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '09:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 22:42:44.025',
    '2024-07-18 22:43:22.384',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'alskdflkajsdf',
    '6687b19d70e5a7cdaea564f3',
    'i love u doctor',
    NULL
  ),
  (
    '7d648abb-1ced-4956-ab37-26928ee724c5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '07:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 22:41:45.593',
    '2024-07-18 22:48:54.601',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'slskd',
    '6687b19d70e5a7cdaea564f3',
    'i love u doctor',
    NULL
  ),
  (
    '8c2de735-b732-432b-950a-b8a2217a3920',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 21:05:35.914',
    '2024-07-18 21:06:27.458',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'alskdflaksjd',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    '944a6373-5086-4a4f-bea4-c5e5e024cd71',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '6e3936fd-6750-43b8-b167-1ec9b5eb9c3d',
    '2024-07-22',
    '14:00:00',
    2,
    'booked',
    'initialConsultation',
    '2024-07-05 14:53:52.633',
    '2024-07-10 22:57:00.566',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'second appointment',
    NULL
  ),
  (
    '9aa13c3e-a53e-45fd-9491-ea6314801d35',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '07:00:00',
    2,
    'booked',
    'initialConsultation',
    '2024-07-18 22:57:36.600',
    '2024-07-18 22:58:26.241',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'i love u doctor',
    NULL
  ),
  (
    'a0e218cb-e994-4d06-96da-769962694af7',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 21:16:56.222',
    '2024-07-18 21:17:19.022',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'not accepted',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'b308e6d6-f3b7-47ca-8f4a-e23ddc59259f',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '06:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 21:07:30.946',
    '2024-07-18 21:16:09.759',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'laskdfj',
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'b7c8cd7c-de1d-4bed-91fe-c76d0447c2a5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-12',
    '11:00:00',
    3,
    'overdue',
    'initialConsultation',
    '2024-07-05 15:03:15.640',
    '2024-07-19 17:02:09.114',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'alskdflaksjdlfkj',
    NULL
  ),
  (
    'd3b5a265-aab0-4eab-8e09-7e8493f3d4ad',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '6e3936fd-6750-43b8-b167-1ec9b5eb9c3d',
    '2024-07-08',
    '13:00:00',
    NULL,
    'overdue',
    'initialConsultation',
    '2024-07-05 14:51:18.757',
    '2024-07-19 17:02:09.114',
    NULL,
    NULL,
    '6687b19d70e5a7cdaea564f3',
    'first appointment',
    NULL
  ),
  (
    'e3b0863a-6d40-42ea-83f3-28975ca4e8d2',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-19',
    '04:00:00',
    NULL,
    'overdue',
    'initialConsultation',
    '2024-07-15 10:40:50.032',
    '2024-07-19 17:02:09.114',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'decline',
    '6687b19d70e5a7cdaea564f3',
    'first check up',
    NULL
  ),
  (
    'ea956227-b673-4743-86a8-b57321790b90',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    '6e3936fd-6750-43b8-b167-1ec9b5eb9c3d',
    '2024-07-29',
    '12:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-15 10:45:43.222',
    '2024-07-18 19:08:26.304',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'personal reason',
    '6687b19d70e5a7cdaea564f3',
    'this is working',
    NULL
  ),
  (
    'fa8078e4-15d3-4b05-9b68-5f084de8fecc',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '2024-07-26',
    '08:00:00',
    NULL,
    'cancelled',
    'initialConsultation',
    '2024-07-18 22:50:16.362',
    '2024-07-18 22:50:46.470',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'lasldkfjlaksdf',
    '6687b19d70e5a7cdaea564f3',
    'i love u doctor',
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
  `BlogID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `IsPublished` tinyint(1) NOT NULL DEFAULT '0',
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  ) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `BookmarkID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ChannelID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `AuthToken` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` enum('member', 'owner', 'admin', 'guest', 'banned') COLLATE utf8mb4_unicode_ci DEFAULT 'member',
  `JoinedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `CreatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
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
  `ChannelID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ChannelName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci,
  `Disease` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChannelType` enum('dm', 'supportGroup') COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `ChatID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SenderID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MediaUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SentAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `IsSeen` tinyint(1) NOT NULL DEFAULT '0',
  `ChannelID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `CommentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ParentCommentID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Speciality` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ConsultationFee` decimal(65, 30) DEFAULT NULL,
  `EducationalBackground` json DEFAULT NULL,
  `LicenseNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
    197.000000000000000000000000000000,
    '\"{\\\"Institution\\\":\\\"BahirDar university\\\",\\\"Degree\\\":\\\"Psychologist\\\",\\\"Specialization\\\":\\\"neonatology\\\",\\\"GraduationYear\\\":2004}\"',
    '1231231231',
    2
  ),
  (
    '73af0fd2-c5a6-4825-9a8a-3191e05d9650',
    'pain_medicine',
    203.000000000000000000000000000000,
    '\"{\\\"Institution\\\":\\\"Bahirdar University\\\",\\\"Degree\\\":\\\"MBBS\\\",\\\"Specialization\\\":\\\"pain_medicine\\\",\\\"GraduationYear\\\":1999,\\\"AdditionalCertifications\\\":[\\\"https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/DoctorCertifications%2Fphoto_2024-06-21_10-02-08%20(2).jpg?alt=media&token=b2e81cb7-a45a-412b-ba48-e2f78a7037d3\\\",\\\"https://firebasestorage.googleapis.com/v0/b/healthlink-webapp-71475.appspot.com/o/DoctorCertifications%2Fphoto_2024-06-21_10-02-07.jpg?alt=media&token=2d20ea0b-c91c-4665-a175-f0290b87275a\\\"]}\"',
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
  `ReviewID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ReviewerID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Rating` int DEFAULT '0',
  `ReviewText` longtext COLLATE utf8mb4_unicode_ci,
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
  `ScheduleID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Date` date DEFAULT NULL,
  `WeekDay` enum(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `ScheduleType` enum('emergency', 'personal', 'normal') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  `Status` enum('available', 'unavailable') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `Note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
    '0adce326-149b-4bbc-8048-1c3199028227',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-19',
    NULL,
    '06:00:00',
    '22:09:11',
    'normal',
    'available',
    '2024-07-15 10:28:35.595',
    '2024-07-15 10:28:35.595',
    NULL
  ),
  (
    '406cf1f9-aae5-414d-8cce-3502e3ceaae9',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-26',
    NULL,
    '07:00:00',
    '22:19:19',
    'normal',
    'available',
    '2024-07-18 22:58:26.226',
    '2024-07-18 22:58:26.226',
    NULL
  ),
  (
    '6e3936fd-6750-43b8-b167-1ec9b5eb9c3d',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'monday',
    '04:00:00',
    '20:00:00',
    'normal',
    'available',
    '2024-07-05 08:27:20.841',
    '2024-07-05 08:27:20.841',
    NULL
  ),
  (
    '9aef91fb-881e-4c22-8f17-9812463439e1',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-12',
    NULL,
    '14:00:00',
    '21:59:35',
    'normal',
    'available',
    '2024-07-10 22:41:38.625',
    '2024-07-10 22:41:38.625',
    NULL
  ),
  (
    'a1c7ce2d-af42-4d6b-a887-cf4490a27e62',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-12',
    NULL,
    '11:00:00',
    '21:59:24',
    'normal',
    'available',
    '2024-07-10 22:40:24.529',
    '2024-07-10 22:40:24.529',
    NULL
  ),
  (
    'c4bf85d3-25d3-4806-a9a0-03bb4508e938',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    '2024-07-22',
    NULL,
    '14:00:00',
    '22:13:59',
    'normal',
    'available',
    '2024-07-10 22:57:00.552',
    '2024-07-10 22:57:00.552',
    NULL
  ),
  (
    'd44d0c9c-82c7-4759-a8fc-c270b812ac16',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'wednesday',
    '04:00:00',
    '20:00:00',
    'normal',
    'available',
    '2024-07-05 08:27:20.841',
    '2024-07-05 08:27:20.841',
    NULL
  ),
  (
    'f8de4053-e13b-4f28-bce5-960b7f4dc678',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    NULL,
    'friday',
    '04:00:00',
    '20:00:00',
    'normal',
    'available',
    '2024-07-05 08:27:20.841',
    '2024-07-05 08:27:20.841',
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
  `FAQID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `FollowerID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FollowingID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FollowersID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `ForumAnswerID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `ForumPostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `ForumPostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Question` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `LikeID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `LikeType` enum('like', 'dislike') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'like',
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
  `RecordID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `VideoChatRoomID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MemberAuthToken` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `MemberID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `MemberInVideoChat_MemberID_key` (`MemberID`),
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
    '6687b19d70e5a7cdaea564f3',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTM0MzUwNiwibmJmIjoxNzIxOTU5MjAwLCJleHAiOjE3MjIwNDU2MDAsInJvb21faWQiOiI2Njg3YjE5ZDcwZTVhN2NkYWVhNTY0ZjMiLCJyb2xlIjoiZ3Vlc3QiLCJ1c2VyX2lkIjoiMGJiMjkyZTMtN2U5Mi00ODk5LWJmYTMtZjc1YzNhZGEwN2YzIiwianRpIjoiZTAxODliYzQtZGM2Yi00ZWYzLTg4NzYtODU5NTU3Mjc2MjM5In0.uFluXNRaluLAK3AO4ttkGAQx4niwCInGaW3utdfxtts',
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
  `NotificationID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `NotificationType` enum(
    'newAppointment',
    'cancelAppointment',
    'acceptAppointment',
    'newChat',
    'newVideoCall',
    'newPost',
    'newForumQuestion',
    'newForumAnswer',
    'newComment'
  ) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ReadAt` datetime(3) DEFAULT NULL,
  `Status` enum('read', 'unread') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
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
    '02a2a58c-3e75-428f-a403-d1fa20db2639',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 04:00 AM ',
    '2024-07-18 22:50:46.475',
    '2024-07-18 22:50:46.475',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '2e499117-a830-46f3-8320-929dab85fd45',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 23:04:21.834',
    '2024-07-18 23:04:21.834',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '4a335d4c-ecb6-4f99-a226-9696d4c62fc4',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 22:50:16.375',
    '2024-07-18 22:50:16.375',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '4ac4f201-ecbf-47ce-b633-5f7a3768996b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 21:16:56.238',
    '2024-07-18 21:16:56.238',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '4f911486-f2a1-435e-9981-05d917c8fda5',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-05 14:53:52.655',
    '2024-07-05 14:53:52.655',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '517bcf37-2b6e-42f6-b7b2-06ba700526ab',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-15 10:44:34.508',
    '2024-07-15 10:44:34.508',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '5ce95756-348d-47ba-88b9-5df95284039d',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 05:00 AM ',
    '2024-07-18 22:43:22.391',
    '2024-07-18 22:43:22.391',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '60c4eb10-b44d-4586-af4a-a63831e50362',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 23:04:43.463',
    '2024-07-18 23:04:43.463',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '636f9e2f-7ec9-4b42-a4ce-7cdd53ce41fa',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 21:35:57.688',
    '2024-07-18 21:35:57.688',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '6a94b255-e314-49cc-96e4-47f4654a3097',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 21:05:35.927',
    '2024-07-18 21:05:35.927',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '6b5fd9f0-adbe-4c98-ae89-17881398e7bb',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:25:28.186',
    '2024-07-18 22:25:28.186',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '7592c62d-77d0-43c9-b89b-9f9f055024f2',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-12 16:15:37.437',
    '2024-07-12 16:15:37.437',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7dc3a487-f208-4cf3-97a0-d7b56bf1c266',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 22:42:44.040',
    '2024-07-18 22:42:44.040',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7ed7fc41-852d-41b7-8e41-055328d0c2f0',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 22:41:45.623',
    '2024-07-18 22:41:45.623',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7f2d44f5-7f45-446f-8c1a-8c0b3a10d601',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-05 14:51:18.777',
    '2024-07-05 14:51:18.777',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '7fa0bdcb-7948-4fb6-adaf-49d4f8d905ae',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 21:07:30.959',
    '2024-07-18 21:07:30.959',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '80c4b975-663e-4051-aea7-ba71dc3e785c',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:27:53.566',
    '2024-07-18 22:27:53.566',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '86bd3698-b652-4d12-bf28-d3678c2f9b2b',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-05 14:58:26.236',
    '2024-07-05 14:58:26.236',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '8ae4f140-2ee6-4783-b408-7f5c0ec0fbc4',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 22:57:36.615',
    '2024-07-18 22:57:36.615',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    '8ee244df-9f42-42f8-be21-3f5a373ef139',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:03:45.504',
    '2024-07-18 22:03:45.504',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    '97de94ce-acdf-419c-abb5-a04029dc8631',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-15 10:45:43.239',
    '2024-07-15 10:45:43.239',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'a3d187bf-e89c-4a30-877b-32942f6c8799',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-05 15:03:15.655',
    '2024-07-05 15:03:15.655',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'a9e30730-4087-4003-9ef7-72ca6ad8395e',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:20:52.483',
    '2024-07-18 22:20:52.483',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'b32a116a-45fe-4519-b7c3-7bcbb11be570',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:19:33.464',
    '2024-07-18 22:19:33.464',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'd175dddc-114a-46e5-8495-dc58538626d1',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:23:07.280',
    '2024-07-18 22:23:07.280',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'da0014d7-4542-41d4-9198-fa302c412b0a',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 21:40:00.489',
    '2024-07-18 21:40:00.489',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'da559c13-977e-4713-a4b0-b8e41b966c4b',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:26:18.209',
    '2024-07-18 22:26:18.209',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'dc428f21-f763-4498-b4e4-60ea033c21e7',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 02:00 AM ',
    '2024-07-18 22:24:16.176',
    '2024-07-18 22:24:16.176',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'dd2264c8-ffe3-40a9-a3a5-3d24b7bd8813',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-18 22:27:26.639',
    '2024-07-18 22:27:26.639',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'e4f38848-9941-42dc-9b1c-ccdf94c60d11',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-15 10:43:29.073',
    '2024-07-15 10:43:29.073',
    'newAppointment',
    NULL,
    'unread'
  ),
  (
    'e895f099-3e54-4f27-96ec-6666e88a1fac',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh  Accepted your Appointment scheduled for 2024-07-26 03:00 AM ',
    '2024-07-18 22:58:26.274',
    '2024-07-18 22:58:26.274',
    'acceptAppointment',
    NULL,
    'unread'
  ),
  (
    'f73dfdd3-ea50-4277-b4a7-e8a67e5afa0f',
    '0bb292e3-7e92-4899-bfa3-f75c3ada07f3',
    'Dr. surafel getaneh Cancelled appointment scheduled for 2024-07-26 03:00 AM ',
    '2024-07-18 22:48:54.609',
    '2024-07-18 22:48:54.609',
    'cancelAppointment',
    NULL,
    'unread'
  ),
  (
    'fc96ccb8-d286-4da5-a83f-c6fd6bc398b2',
    '32663e2f-7757-448e-b807-ef1d0f7123f1',
    'dawit abebe has requested new appointment',
    '2024-07-15 10:40:50.053',
    '2024-07-15 10:40:50.053',
    'newAppointment',
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
  `PaymentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Amount` double NOT NULL,
  `PaymentDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `PaymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppointmentID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentStatus` enum('pending', 'completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
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
  `PostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `MediaID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CommentID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MediaType` enum('video', 'image') COLLATE utf8mb4_unicode_ci NOT NULL,
  `URL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ForumAnswerID` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ContentType` enum('forumAnswer', 'post', 'comment', 'blog') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
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
  `PrescriptionID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DoctorID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PatientID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IssuedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ValidUntil` datetime(3) DEFAULT NULL,
  `Status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `AttachmentID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PrescriptionID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `URL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Size` int NOT NULL,
  `Caption` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `PrescriptionItemID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PrescriptionID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MedicationName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Dosage` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Instructions` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Frequency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `ReplyID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FeedbackID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `ReportID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ItemType` enum('forumAnswer', 'post', 'comment', 'blog') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
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
  `ShareID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Platform` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Table structure for table `UserFeedback`
--

DROP TABLE IF EXISTS `UserFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `UserFeedback` (
  `FeedbackID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `Type` enum(
    'generalFeedback',
    'question',
    'review',
    'enquiry'
  ) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'generalFeedback',
  `Rating` int DEFAULT NULL,
  `Review` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `UserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FirstName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfBirth` datetime(3) DEFAULT NULL,
  `Gender` enum('male', 'female') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Bio` longtext COLLATE utf8mb4_unicode_ci,
  `PhoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProfilePicture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` enum(
    'doctor',
    'patient',
    'admin',
    'moderator',
    'organization'
  ) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` enum(
    'active',
    'inactive',
    'suspended',
    'blocked',
    'deleted'
  ) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Verified` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `LastLogin` datetime(3) DEFAULT NULL,
  `Password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
    NULL,
    'patient',
    'active',
    1,
    '2024-06-27 22:53:14.131',
    '2024-07-04 13:15:48.904',
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
    '2024-07-06 09:38:42.901',
    '2024-07-04 13:15:31.958',
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
    '2024-07-04 13:15:59.278',
    '2024-07-04 13:15:59.277',
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
  `RoomID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HostAuthToken` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `UpdatedAt` datetime(3) NOT NULL,
  `HostID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3Nfa2V5IjoiNjYzNGExNmNhM2YxYzRjNjBmNDYzYzU4IiwidHlwZSI6ImFwcCIsInZlcnNpb24iOjIsImlhdCI6MTcyMTM0MzUwNiwibmJmIjoxNzIxOTU5MjAwLCJleHAiOjE3MjIwNDU2MDAsInJvb21faWQiOiI2Njg3YjE5ZDcwZTVhN2NkYWVhNTY0ZjMiLCJyb2xlIjoiaG9zdCIsInVzZXJfaWQiOiIzMjY2M2UyZi03NzU3LTQ0OGUtYjgwNy1lZjFkMGY3MTIzZjEiLCJqdGkiOiIxODZiYmU0ZC1hMDgyLTQ5MjgtODdiMi1jMjU1NGJiZTAyZTIifQ.YdUxRBk-xYIxWiLvVD6tx7V8Ejy2IgqX4BlbSPRHH0g',
    '2024-07-05 08:41:02.287',
    '2024-07-18 22:58:26.265',
    '32663e2f-7757-448e-b807-ef1d0f7123f1'
  );
/*!40000 ALTER TABLE `VideoChatRoom` ENABLE KEYS */
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
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
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
    '0115b7a8-3fc3-4875-8dd8-707b10a63944',
    '7ddb6ca723aee615ec96c2bfbc2c22326dfb92f55fc5e5029050c83e0e649ecc',
    '2024-07-19 19:15:23.312',
    '20240718203130_remove_unique_constraint_again',
    NULL,
    NULL,
    '2024-07-19 19:15:23.107',
    1
  ),
  (
    '1d835ff0-dd36-4bf5-b93b-d3988f600c57',
    '8d13c6aba4d0e356f456796be03b2d6ade5b357dff3b430aa38be5e4788947d3',
    '2024-07-19 19:15:20.769',
    '20240601175801_',
    NULL,
    NULL,
    '2024-07-19 19:15:20.747',
    1
  ),
  (
    '26d3eac6-b0f6-454b-aacd-6c15bf97c84a',
    'd3f38c9683171cc6889e70aa37ef0091481af3c769746800f44cc5bdddf6fe49',
    '2024-07-19 19:15:21.789',
    '20240605075805_blog_and_users',
    NULL,
    NULL,
    '2024-07-19 19:15:21.152',
    1
  ),
  (
    '33722147-4037-43f8-ab94-e0357cbf93f4',
    '7490288c0d3dcb8b76c7a6cb515a082f8c495ad8c38f17a15c4d3b94231b96e6',
    '2024-07-19 19:15:22.976',
    '20240704141711_member',
    NULL,
    NULL,
    '2024-07-19 19:15:22.959',
    1
  ),
  (
    '35591532-d019-4a93-ac28-04474ac622fe',
    'df02f41586d4f0eb87347930f3f9166f82e1c9ea3b517be8f7576e17be59061a',
    '2024-07-19 19:15:23.745',
    '20240719190830_init',
    NULL,
    NULL,
    '2024-07-19 19:15:23.315',
    1
  ),
  (
    '371407d3-03dd-48e4-87c7-dac78e7b5f80',
    '287667426b67fc95f4c3d91b19d45be9c89c9f83a3800bf4018a8bc80e57963c',
    '2024-07-19 19:15:19.024',
    '20240523153639_notification',
    NULL,
    NULL,
    '2024-07-19 19:15:18.952',
    1
  ),
  (
    '3e765d93-f808-4141-85d3-4e918be6ba47',
    '99a2284f0ab56ab7748fdc3cf9d0677bf1138cb5c28842fbbbb57b68cab099c3',
    '2024-07-19 19:15:22.481',
    '20240605225142_payment',
    NULL,
    NULL,
    '2024-07-19 19:15:22.218',
    1
  ),
  (
    '41216289-c609-46bb-a1e9-278fe8e9d4aa',
    'c712d492e178274f82c8a7985b076ed85d9d272d6e7a814750f074a371aaa285',
    '2024-07-19 19:15:19.270',
    '20240527192631_',
    NULL,
    NULL,
    '2024-07-19 19:15:19.126',
    1
  ),
  (
    '4cfd7886-cef2-4d09-9ba7-7d9f267d5204',
    '5f91404311f67e6cd448874c0c888b1bf9698e6a8f088406676eb71a03dae3cf',
    '2024-07-19 19:15:20.936',
    '20240601180826_forum',
    NULL,
    NULL,
    '2024-07-19 19:15:20.772',
    1
  ),
  (
    '4fab5eb1-28c0-4c71-81c4-ac26719200e8',
    'fa0d2271fe25ca32f12d12b5e6c46d04dddc5259e33d84f5a560ce0af5468c4a',
    '2024-07-19 19:15:22.888',
    '20240704085048_appointment',
    NULL,
    NULL,
    '2024-07-19 19:15:22.811',
    1
  ),
  (
    '52bf38ba-992d-4d32-b0b3-090ce25c2e3f',
    '983ad3977993826a3a6eee6dc2c090a6b588d0901bd572413d1e4988768a85a1',
    '2024-07-19 19:15:22.712',
    '20240628215633_username',
    NULL,
    NULL,
    '2024-07-19 19:15:22.599',
    1
  ),
  (
    '57a9ff95-b766-4dde-a83c-5d864416c30b',
    '8fbcc09fb3d1aab3394f53479b480661850e0d60b925855ef3742bcaf2ad8cde',
    '2024-07-19 19:15:17.278',
    '20240520160006_',
    NULL,
    NULL,
    '2024-07-19 19:15:12.679',
    1
  ),
  (
    '68a14a9c-55e4-452e-9bdd-701d3b8582df',
    '2356484107ed489b086ff5109ca42bf819ffe9838042b6d78f6196218a588768',
    '2024-07-19 19:15:23.104',
    '20240718202602_remove_unique_constraint',
    NULL,
    NULL,
    '2024-07-19 19:15:23.033',
    1
  ),
  (
    '6ea1beb8-2109-4fb2-b8dd-36e551b3bb6a',
    'af64910b255bdf03fe9e7e5a37d6cf479b7508cc62da309d3861a52e86446d7f',
    '2024-07-19 19:15:21.943',
    '20240605081638_test',
    NULL,
    NULL,
    '2024-07-19 19:15:21.793',
    1
  ),
  (
    '72c1bd8c-88df-4a76-a48d-a7657fb7ae5c',
    'dd31cc49b57bb4f7705f8e53e48aa6ff299e62ab04a2377e5c3bd49c1348d322',
    '2024-07-19 19:15:18.484',
    '20240520205421_',
    NULL,
    NULL,
    '2024-07-19 19:15:18.314',
    1
  ),
  (
    '85e9ceff-a009-4cfe-b348-f236baec6fc3',
    'af0123fe1152a95a9035dcd47a11670c9a6af4fba53ee5a51fcfad6441d480d0',
    '2024-07-19 19:15:20.629',
    '20240601130852_comments',
    NULL,
    NULL,
    '2024-07-19 19:15:20.024',
    1
  ),
  (
    '8df48151-2078-4031-add4-5a96ce9cdbdf',
    'b03eeef046e9c70503ec544dcae82cff5b39d5fda8ff1f6e7069aa70277f0c67',
    '2024-07-19 19:15:17.480',
    '20240520172228_',
    NULL,
    NULL,
    '2024-07-19 19:15:17.281',
    1
  ),
  (
    '8ed1ebae-999b-4741-b77a-68b9df97121a',
    '58e23d96d99c1f6ae28fefbb15e9f4350b6e046157ca77c78f1ede67a4e147bb',
    '2024-07-19 19:15:21.149',
    '20240603212706_post_media',
    NULL,
    NULL,
    '2024-07-19 19:15:21.135',
    1
  ),
  (
    '8f1b596c-91bf-4a47-b81a-9c58282a4b7b',
    'f8e3d23a1b9cc558af606843b1dd807bc42d8f73d9a3f6743e5031d02ad80c39',
    '2024-07-19 19:15:22.132',
    '20240605114038_test',
    NULL,
    NULL,
    '2024-07-19 19:15:22.064',
    1
  ),
  (
    '90aa2043-3e38-4a68-9978-d7011539c9ae',
    '3ddff687c2d9845cf97117f495905ecff752c0739ab58aa8d20118e39dc689a2',
    '2024-07-19 19:15:19.118',
    '20240525211831_chat',
    NULL,
    NULL,
    '2024-07-19 19:15:19.027',
    1
  ),
  (
    '95cf7739-dc98-42e7-8425-0500e5872881',
    '0da94b16f8784d81821c3697da791ea3d9e3d9075d215fba6fce1d95e0f3b94c',
    '2024-07-19 19:15:22.912',
    '20240704135413_member',
    NULL,
    NULL,
    '2024-07-19 19:15:22.891',
    1
  ),
  (
    '97a9ae7f-c296-4cf1-8b9b-9799a1dfae24',
    '439a72be64a3e59291429cc7b494387faca2abc6ab5154df2a098b19fde5ed0b',
    '2024-07-19 19:15:22.161',
    '20240605114204_',
    NULL,
    NULL,
    '2024-07-19 19:15:22.135',
    1
  ),
  (
    '9cac4475-35e6-4d15-a54c-ccc08c217721',
    'bfe587d5de6727df4be98009cdf61e12238b71f125d5ce17404380146580acd4',
    '2024-07-19 19:15:19.904',
    '20240531213942_post',
    NULL,
    NULL,
    '2024-07-19 19:15:19.273',
    1
  ),
  (
    '9e8328be-bb57-48fe-ace1-47d1a10dd6a7',
    '0e9e3d0a3fea3e2c29c082e2551ab10e0ac485e4354bee024300fd72fa405abe',
    '2024-07-19 19:15:18.311',
    '20240520173747_',
    NULL,
    NULL,
    '2024-07-19 19:15:17.484',
    1
  ),
  (
    '9eb49ae1-9d35-4e63-83d2-99d2118c0fe9',
    'bd89d5769c4c2ae40a3adebd00166d07f114fc1a308196bc4e5cf323b53f300b',
    '2024-07-19 19:15:20.744',
    '20240601175241_',
    NULL,
    NULL,
    '2024-07-19 19:15:20.631',
    1
  ),
  (
    'a18dbda3-26c2-4266-a55f-100ab0f7270d',
    'e9a5fbb444f6f332074cce40332cc72e7a29cecbbcb7a24868386a41823745b7',
    '2024-07-19 19:15:21.044',
    '20240601222814_',
    NULL,
    NULL,
    '2024-07-19 19:15:20.942',
    1
  ),
  (
    'ab6eda60-dc12-4a84-98dd-91c2207f21b6',
    'd319a405d139bb6dff7cefe58587fa4c4d0a4e4ee77b160652fa50d62efbe0de',
    '2024-07-19 19:15:22.215',
    '20240605114342_',
    NULL,
    NULL,
    '2024-07-19 19:15:22.165',
    1
  ),
  (
    'af091282-ac6a-4fed-92a8-e419a0bd7f50',
    'f2feb0276c02e6a8ec2d9613f4c5f0e338b6108ba6b243ce8e3a818d70f76bb7',
    '2024-07-19 19:15:22.756',
    '20240702175558_notification',
    NULL,
    NULL,
    '2024-07-19 19:15:22.733',
    1
  ),
  (
    'b3804efa-54cb-4dd8-9349-914130a1470c',
    'b801655cc9adc97dbc58324254323195e6599eec1553271e15e430fc3594ca3a',
    '2024-07-19 19:15:22.809',
    '20240702223639_notification1',
    NULL,
    NULL,
    '2024-07-19 19:15:22.759',
    1
  ),
  (
    'b8bb775f-fd53-4816-b8cd-48116b12ac11',
    'a132fc822be7a208fe6fa61a0b11e5cfd0b02032ca81c1c16e06a45a71edbf6a',
    '2024-07-19 19:15:23.030',
    '20240718191759_test',
    NULL,
    NULL,
    '2024-07-19 19:15:23.007',
    1
  ),
  (
    'c3f2e347-9499-4ebe-80b7-1536710ec8ca',
    'bad9a26991e38540f99b2f0ae83c40457bdeb2c7363c7d707347638791db1a3e',
    '2024-07-19 19:15:18.709',
    '20240522075508_new',
    NULL,
    NULL,
    '2024-07-19 19:15:18.490',
    1
  ),
  (
    'c7bf76f5-fff3-44db-bbdb-8d57312cb4f4',
    '448d1893cf15bdc166dc6ddc772bbfeab15e4e7309f6a600c7952f5dddb38ae5',
    '2024-07-19 19:15:22.061',
    '20240605113706_comment',
    NULL,
    NULL,
    '2024-07-19 19:15:21.949',
    1
  ),
  (
    'd67d2df4-24d4-4171-ae0a-822d63685857',
    'd114e63cf3028790ca721a0a28aa829766213e951ce71321fc2c555baeed1978',
    '2024-07-19 19:15:23.004',
    '20240708183203_forum_title',
    NULL,
    NULL,
    '2024-07-19 19:15:22.979',
    1
  ),
  (
    'da407323-c14c-42c4-9d2b-d6d2cac19e5e',
    '06e753ea5b6ba31f20bf0d0ad76b9e3e2b7e32b618ff7e07e78a269da7f5ba8b',
    '2024-07-19 19:15:22.956',
    '20240704141227_memeber',
    NULL,
    NULL,
    '2024-07-19 19:15:22.915',
    1
  ),
  (
    'db023c96-bcb4-4afa-bf26-5d44cbb0c163',
    '9499698a9770d1d79014a17b2876000930bf28afec7524dc4d683a935e47b2d0',
    '2024-07-19 19:15:18.949',
    '20240523015522_videocall_members',
    NULL,
    NULL,
    '2024-07-19 19:15:18.741',
    1
  ),
  (
    'e2950185-d1e3-46fd-99c0-06e3bcd31ffb',
    '43b9b77db282bbb782f3d5d8a50f4ef8d82a73862d4562dc871bb5a2d7952552',
    '2024-07-19 19:15:20.021',
    '20240601062525_comment',
    NULL,
    NULL,
    '2024-07-19 19:15:19.907',
    1
  ),
  (
    'e85e39ec-8d3e-42f5-98c5-85d68897ad0a',
    'a2e437ad9fa9e2f5d8d4c4f050f1e85260cf5344d4e90383d53d6abd072673f8',
    '2024-07-19 19:15:21.132',
    '20240603211703_post_media',
    NULL,
    NULL,
    '2024-07-19 19:15:21.048',
    1
  ),
  (
    'ecee0648-e011-4ecc-a488-475ea8dce581',
    'e27db060a6f25a73c9a9808bbaa84dad9351f6d65d68dc39ef1e96e1405c4089',
    '2024-07-19 19:15:22.730',
    '20240630111317_rating',
    NULL,
    NULL,
    '2024-07-19 19:15:22.715',
    1
  ),
  (
    'fca4627c-8ef2-49c8-be44-bd0aee4734d5',
    'ea07730dae53836a1339f16c77788745d4ce7a45ac138252f932a840c86ba489',
    '2024-07-19 19:15:22.596',
    '20240626190316_password',
    NULL,
    NULL,
    '2024-07-19 19:15:22.504',
    1
  ),
  (
    'fd6193a6-cb16-4ad3-9e3a-55dad31fde13',
    '6962b2d490363431de1ae09aaab7819eac3399523e2e68c9d603c85019c5d36a',
    '2024-07-19 19:15:18.738',
    '20240522130810_',
    NULL,
    NULL,
    '2024-07-19 19:15:18.712',
    1
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
-- Dump completed on 2024-07-19 15:01:45