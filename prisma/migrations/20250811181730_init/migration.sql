/*
  Warnings:

  - Added the required column `service` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `cancellationReason` VARCHAR(191) NULL,
    ADD COLUMN `manicureId` INTEGER NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `service` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_manicureId_fkey` FOREIGN KEY (`manicureId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
