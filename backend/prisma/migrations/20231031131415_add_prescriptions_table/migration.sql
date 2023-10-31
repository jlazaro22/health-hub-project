/*
  Warnings:

  - You are about to drop the column `patient_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `specialty_id` on the `appointments` table. All the data in the column will be lost.
  - The primary key for the `doctor_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `patientId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_specialty_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "patient_id",
DROP COLUMN "specialty_id",
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "specialtyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "doctor_schedules" DROP CONSTRAINT "doctor_schedules_pkey",
ADD CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id", "doctor_id", "date", "start_time", "end_time");

-- CreateTable
CREATE TABLE "prescriptions" (
    "appointment_number" INTEGER NOT NULL,
    "appointment_doctor_id" TEXT NOT NULL,
    "medicine_id" TEXT NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("appointment_number","appointment_doctor_id","medicine_id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_appointment_number_appointment_doctor_id_fkey" FOREIGN KEY ("appointment_number", "appointment_doctor_id") REFERENCES "appointments"("appointment_number", "doctor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
