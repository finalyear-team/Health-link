/*
  Warnings:

  - You are about to drop the column `Username` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DoctorDetails` ADD COLUMN `LicenseFile` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MedicalRecord` ADD COLUMN `Note` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `Username`,
    MODIFY `Status` ENUM('active', 'inactive', 'suspended', 'blocked', 'deleted') NOT NULL DEFAULT 'active';

-- CreateTable
CREATE TABLE `TokenBlackList` (
    `TokenID` VARCHAR(191) NOT NULL,
    `Token` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NOT NULL,
    `BlackListedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ExpiresAt` DATETIME(3) NULL,

    PRIMARY KEY (`TokenID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthOrganization` (
    `OrganizationID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Logo` VARCHAR(191) NULL,
    `StreetAddress` VARCHAR(191) NULL,
    `PostalCode` VARCHAR(191) NULL,
    `City` VARCHAR(191) NOT NULL,
    `State` VARCHAR(191) NULL,
    `Country` VARCHAR(191) NOT NULL,
    `TIN` VARCHAR(191) NOT NULL,
    `OrganizationType` ENUM('generalHospital', 'specialtyHospital', 'clinic', 'diagnosticCenter', 'laboratory', 'pharmacy', 'nursingHome', 'rehabilitationCenter', 'primaryHealthcareCenter', 'dentalClinic', 'maternityHome', 'mentalHealthCenter', 'surgeryCenter', 'opticalClinic', 'urgentCareCenter', 'fertilityClinic', 'ambulatoryCareCenter') NOT NULL,
    `LicenseNumber` VARCHAR(191) NOT NULL,
    `AdminID` VARCHAR(191) NOT NULL,
    `IsVerified` BOOLEAN NOT NULL DEFAULT false,
    `AccreditationDate` DATETIME(3) NULL,
    `ContactPhone` VARCHAR(191) NULL,
    `ContactEmail` VARCHAR(191) NULL,
    `Website` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`OrganizationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TokenBlackList` ADD CONSTRAINT `TokenBlackList_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthOrganization` ADD CONSTRAINT `HealthOrganization_AdminID_fkey` FOREIGN KEY (`AdminID`) REFERENCES `Users`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
