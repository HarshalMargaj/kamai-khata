/*
  Warnings:

  - Added the required column `userId` to the `Sheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sheet" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
