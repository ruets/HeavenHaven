/*
  Warnings:

  - You are about to drop the column `remaining` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `built` on the `Island` table. All the data in the column will be lost.
  - You are about to drop the column `climate` on the `Island` table. All the data in the column will be lost.
  - You are about to drop the column `climateImg` on the `Island` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImg` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weatherImg` to the `Island` table without a default value. This is not possible if the table is not empty.
  - Made the column `activitiesImg` on table `Island` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wildlifeImg` on table `Island` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "remaining",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Island" DROP COLUMN "built",
DROP COLUMN "climate",
DROP COLUMN "climateImg",
ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "document" TEXT NOT NULL,
ADD COLUMN     "mainImg" TEXT NOT NULL,
ADD COLUMN     "weather" VARCHAR(625),
ADD COLUMN     "weatherImg" TEXT NOT NULL,
ALTER COLUMN "activitiesImg" SET NOT NULL,
ALTER COLUMN "activitiesImg" SET DATA TYPE TEXT,
ALTER COLUMN "wildlifeImg" SET NOT NULL,
ALTER COLUMN "wildlifeImg" SET DATA TYPE TEXT;
