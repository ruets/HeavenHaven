-- AlterTable
ALTER TABLE "Island" ADD COLUMN     "activitiesImg" VARCHAR(625),
ADD COLUMN     "climateImg" VARCHAR(625),
ADD COLUMN     "wildlifeImg" VARCHAR(625);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "islandId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_islandId_fkey" FOREIGN KEY ("islandId") REFERENCES "Island"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
