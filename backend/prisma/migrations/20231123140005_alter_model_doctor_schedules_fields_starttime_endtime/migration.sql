/*
  Warnings:

  - The primary key for the `doctor_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `start_time` on the `doctor_schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `doctor_schedules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "doctor_schedules" DROP CONSTRAINT "doctor_schedules_pkey",
DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id", "doctor_id", "date", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_doctor_id_date_start_time_end_time_key" ON "doctor_schedules"("doctor_id", "date", "start_time", "end_time");
