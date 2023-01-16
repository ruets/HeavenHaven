/*
  Warnings:

  - You are about to drop the column `idCardLink` on the `User` table. All the data in the column will be lost.
  - Added the required column `idCardLink1` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "idCardLink",
ADD COLUMN     "idCardLink1" VARCHAR(255) NOT NULL,
ADD COLUMN     "idCardLink2" VARCHAR(255);
