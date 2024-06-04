-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_PostID_fkey`;

-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `PostMedia` DROP FOREIGN KEY `PostMedia_CommentID_fkey`;

-- DropForeignKey
ALTER TABLE `PostMedia` DROP FOREIGN KEY `PostMedia_PostID_fkey`;

-- DropForeignKey
ALTER TABLE `Share` DROP FOREIGN KEY `Share_PostID_fkey`;

-- AlterTable
ALTER TABLE `BlogPost` ADD COLUMN `PublishedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Comments` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL;

-- AlterTable
ALTER TABLE `Likes` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL;

-- AlterTable
ALTER TABLE `Views` MODIFY `ItemType` ENUM('forumAnswer', 'post', 'comment', 'blog') NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `blogpost_fkey` FOREIGN KEY (`ItemID`) REFERENCES `BlogPost`(`BlogID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostMedia` ADD CONSTRAINT `PostMedia_CommentID_fkey` FOREIGN KEY (`CommentID`) REFERENCES `Comments`(`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Views` ADD CONSTRAINT `comment_view_fkey` FOREIGN KEY (`ItemID`) REFERENCES `Comments`(`CommentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_PostID_fkey` FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE ON UPDATE CASCADE;
