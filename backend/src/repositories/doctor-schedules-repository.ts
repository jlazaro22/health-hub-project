import { DoctorSchedule, Prisma } from '@prisma/client';

interface Paginable<T> {
	data: T[];
	totalPages: number;
}

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
	remove(id: string): Promise<void>;
	getAll(page: number): Promise<Paginable<DoctorSchedule>>;
}
