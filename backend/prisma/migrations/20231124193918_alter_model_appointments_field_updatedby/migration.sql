/*
  Warnings:

  - A unique constraint covering the columns `[appointment_number,doctor_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_by` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "updated_by" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_appointment_number_doctor_id_key" ON "appointments"("appointment_number", "doctor_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
