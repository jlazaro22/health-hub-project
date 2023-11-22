/*
  Warnings:

  - A unique constraint covering the columns `[updated_by]` on the table `doctor_schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_by` to the `doctor_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor_schedules" ADD COLUMN     "updated_by" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_updated_by_key" ON "doctor_schedules"("updated_by");

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
