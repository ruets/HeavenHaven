/*
  Warnings:

  - You are about to drop the column `documents` on the `Island` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Island` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `Island` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "startDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Island" DROP COLUMN "documents",
ADD COLUMN     "document" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "idCardLink" SET DATA TYPE TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Island_name_key" ON "Island"("name");
