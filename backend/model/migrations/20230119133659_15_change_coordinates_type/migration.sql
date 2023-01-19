/*
  Warnings:

  - Added the required column `weatherDesc` to the `Island` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "weatherDesc" TEXT NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;
