import { DoctorSchedule, Prisma } from '@prisma/client';

export interface DoctorSchedulesRepository {
	findById(id: string): Promise<DoctorSchedule | null>;
	findExistentByDoctorId(
		doctorId: string,
		date: Date,
		startTime: Date,
		endTime: Date
	): Promise<DoctorSchedule | null>;
	findAllByDoctorId(id: string): Promise<DoctorSchedule[] | null>;
	create(
		data: Prisma.DoctorScheduleUncheckedCreateInput
	): Promise<DoctorSchedule>;
	update(data: DoctorSchedule): Promise<DoctorSchedule>;
	remove(id: string): void;
	getAll(): Promise<DoctorSchedule[] | null>;
}
