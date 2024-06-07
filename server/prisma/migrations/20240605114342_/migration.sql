/*
  Warnings:

  - You are about to drop the column `comeOn` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the `Comeon` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `comeOn`,
    MODIFY `Edited` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Comeon`;
