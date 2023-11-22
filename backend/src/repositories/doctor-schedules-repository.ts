import { DoctorSchedule, Prisma } from '@prisma/client';

export interface DoctorSchedulesRepository {
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
	getAll(): Promise<DoctorSchedule[] | null>;
}
