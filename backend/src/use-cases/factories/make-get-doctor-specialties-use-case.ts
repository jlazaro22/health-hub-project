import { PrismaDoctorSpecialtiesRepository } from '@/repositories/prisma/prisma-doctor-specialties-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetDoctorSpecialtiesUseCase } from '../doctors/get-doctor-specialties';

export function makeGetDoctorSpecialtiesUseCase() {
	const doctorSpecialtiesRepository = new PrismaDoctorSpecialtiesRepository();
	const usersRepository = new PrismaUsersRepository();

	const assignDoctorSpecialtiesUseCase = new GetDoctorSpecialtiesUseCase(
		doctorSpecialtiesRepository,
		usersRepository
	);

	return assignDoctorSpecialtiesUseCase;
}
