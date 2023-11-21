/*
  Warnings:

  - You are about to drop the column `patientId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `specialtyId` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty_id` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_specialtyId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "patientId",
DROP COLUMN "specialtyId",
ADD COLUMN     "patient_id" TEXT NOT NULL,
ADD COLUMN     "specialty_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "doctor_specialties" (
    "doctor_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,

    CONSTRAINT "doctor_specialties_pkey" PRIMARY KEY ("doctor_id","specialty_id")
);

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialties" ADD CONSTRAINT "doctor_specialties_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
