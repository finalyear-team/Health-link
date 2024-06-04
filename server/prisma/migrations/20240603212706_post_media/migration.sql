-- AlterTable
ALTER TABLE `PostMedia` MODIFY `ContentType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL DEFAULT 'post';
