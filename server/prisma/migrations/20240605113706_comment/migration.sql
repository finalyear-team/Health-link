/*
  Warnings:

  - You are about to drop the `Comeon` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `Edited` BOOLEAN NOT NULL DEFAULT false;


-- DropTable
DROP TABLE `Comeon`;
