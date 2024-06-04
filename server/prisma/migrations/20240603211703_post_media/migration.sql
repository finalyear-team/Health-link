/*
  Warnings:

  - Added the required column `ContentType` to the `PostMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PostMedia` ADD COLUMN `ContentType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL;

-- CreateIndex
CREATE INDEX `Likes_CreatedAt_idx` ON `Likes`(`CreatedAt`);

-- RenameIndex
ALTER TABLE `Likes` RENAME INDEX `Likes_UserID_fkey` TO `Likes_UserID_idx`;

-- RenameIndex
ALTER TABLE `Likes` RENAME INDEX `forum_answer_comment_fkey` TO `Likes_ItemID_idx`;
