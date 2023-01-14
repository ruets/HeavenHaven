/*
  Warnings:

  - You are about to drop the column `sponsorId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[islandId]` on the table `Auction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `continent` to the `Island` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_islandId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "sponsorId",
ADD COLUMN     "remainingUses" INTEGER NOT NULL DEFAULT 2;

-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "continent" VARCHAR(15) NOT NULL;

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "apt" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "zip" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "idCardLink" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "islandId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_watchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_watchlist_AB_unique" ON "_watchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_watchlist_B_index" ON "_watchlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Auction_islandId_key" ON "Auction"("islandId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_islandId_fkey" FOREIGN KEY ("islandId") REFERENCES "Island"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchlist" ADD CONSTRAINT "_watchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Auction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchlist" ADD CONSTRAINT "_watchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
