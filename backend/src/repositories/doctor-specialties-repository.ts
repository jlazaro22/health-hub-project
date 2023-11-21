import { Prisma, SpecialtiesOnDoctors } from '@prisma/client';

export interface DoctorSpecialtiesRepository {
	findByDoctorId(id: string): Promise<SpecialtiesOnDoctors[] | null>;
	create(
		data: Prisma.SpecialtiesOnDoctorsUncheckedCreateInput
	): Promise<SpecialtiesOnDoctors>;
}
