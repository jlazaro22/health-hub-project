/*
  Warnings:

  - A unique constraint covering the columns `[doctor_id,date,start_time,end_time]` on the table `doctor_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "doctor_schedules_updated_by_key";

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_doctor_id_date_start_time_end_time_key" ON "doctor_schedules"("doctor_id", "date", "start_time", "end_time");
