-- AlterTable
ALTER TABLE `ChannelMember` MODIFY `Role` ENUM('member', 'owner', 'admin', 'guest', 'banned') NULL DEFAULT 'member';
