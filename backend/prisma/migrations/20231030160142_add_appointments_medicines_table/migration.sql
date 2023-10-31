/*
  Warnings:

  - The primary key for the `doctor_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `doctor_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "doctor_schedules_id_doctor_id_idx";

-- AlterTable
ALTER TABLE "doctor_schedules" DROP CONSTRAINT "doctor_schedules_pkey",
ADD CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id", "doctor_id");

-- CreateTable
CREATE TABLE "appointments" (
    "appointment_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "doctor_schedule_id" TEXT NOT NULL,
    "specialty_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("appointment_number","doctor_id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointments_doctor_schedule_id_key" ON "appointments"("doctor_schedule_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_id_key" ON "doctor_schedules"("id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_schedule_id_fkey" FOREIGN KEY ("doctor_schedule_id") REFERENCES "doctor_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
