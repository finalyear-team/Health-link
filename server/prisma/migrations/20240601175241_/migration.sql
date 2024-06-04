-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `forum_answer_fkey`;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `forum_answer_comment_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Views` ADD CONSTRAINT `forum_answer_view_fkey` FOREIGN KEY (`ItemID`) REFERENCES `ForumAnswer`(`ForumAnswerID`) ON DELETE CASCADE ON UPDATE CASCADE;
