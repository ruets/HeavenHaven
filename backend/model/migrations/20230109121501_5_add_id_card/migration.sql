/*
  Warnings:

  - You are about to alter the column `sponsorCode` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[sponsorCode]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCardLink` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "sponsorCode" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apt" VARCHAR(255),
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "idCardLink" VARCHAR(255) NOT NULL,
ADD COLUMN     "zip" VARCHAR(255) NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_sponsorCode_key" ON "Customer"("sponsorCode");
