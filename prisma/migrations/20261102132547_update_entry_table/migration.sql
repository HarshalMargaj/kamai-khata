/*
  Warnings:

  - You are about to drop the column `Fees` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "Fees",
ADD COLUMN     "fees" DECIMAL(12,2) NOT NULL DEFAULT 0,
ALTER COLUMN "investedAmount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "returnAmount" SET DATA TYPE DECIMAL(12,2);
