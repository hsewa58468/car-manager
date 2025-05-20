/*
  Warnings:

  - You are about to drop the `InfoItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "InfoCategory" ADD COLUMN     "special" TEXT[];

-- DropTable
DROP TABLE "InfoItem";
