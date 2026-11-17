/*
  Warnings:

  - Added the required column `sheetId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "sheetId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Expense_sheetId_idx" ON "Expense"("sheetId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
