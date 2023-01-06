/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastNname" VARCHAR(255) NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
