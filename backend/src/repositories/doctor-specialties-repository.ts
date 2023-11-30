import { Prisma, SpecialtiesOnDoctors } from '@prisma/client';

interface Paginable<T> {
	data: T[];
	totalPages: number;
}

export interface DoctorSpecialtiesRepository {
	findByDoctorId(id: string): Promise<SpecialtiesOnDoctors[] | null>;
	findBySpecialtyId(
		id: string,
		page: number
	): Promise<Paginable<SpecialtiesOnDoctors>>;
	create(
		data: Prisma.SpecialtiesOnDoctorsUncheckedCreateInput
	): Promise<SpecialtiesOnDoctors>;
}
