/*
  Warnings:

  - The primary key for the `Agent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `Agent` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_initiatorId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_bidderId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_sellerId_fkey";

-- DropIndex
DROP INDEX "Agent_idUser_key";

-- DropIndex
DROP INDEX "Customer_idUser_key";

-- AlterTable
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_pkey",
DROP COLUMN "idUser",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Agent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "idUser",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_id_key" ON "Agent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
