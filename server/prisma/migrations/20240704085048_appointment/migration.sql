-- AlterTable
ALTER TABLE `Appointments` MODIFY `Status` ENUM('pending', 'overDue', 'booked', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';
