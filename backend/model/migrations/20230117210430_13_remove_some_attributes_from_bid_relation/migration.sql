/*
  Warnings:

  - You are about to drop the column `remaining` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Bid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "remaining",
DROP COLUMN "status";
