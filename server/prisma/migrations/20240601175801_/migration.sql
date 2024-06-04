/*
  Warnings:

  - Added the required column `Title` to the `ForumPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ForumPost` ADD COLUMN `Title` TEXT NOT NULL;
