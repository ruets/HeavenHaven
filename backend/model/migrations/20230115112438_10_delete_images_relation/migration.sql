/*
  Warnings:

  - You are about to drop the column `idCardLink1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `idCardLink2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idCardLink` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_islandId_fkey";

-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idCardLink1",
DROP COLUMN "idCardLink2",
ADD COLUMN     "idCardLink" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Image";
