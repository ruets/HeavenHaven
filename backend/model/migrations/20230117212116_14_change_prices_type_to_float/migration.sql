/*
  Warnings:

  - You are about to drop the column `price` on the `Auction` table. All the data in the column will be lost.
  - Added the required column `reservePrice` to the `Auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "price",
ADD COLUMN     "reservePrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Bid" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
