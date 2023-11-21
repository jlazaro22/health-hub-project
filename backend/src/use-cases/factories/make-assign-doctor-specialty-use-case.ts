import { PrismaDoctorSpecialtiesRepository } from '@/repositories/prisma/prisma-doctor-specialties-repository';
import { AssignDoctorSpecialtyUseCase } from '../management/doctor-specialties/assign-doctor-specialty';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';

export function makeAssignDoctorSpecialtyUseCase() {
	const doctorSpecialtiesRepository = new PrismaDoctorSpecialtiesRepository();
	const usersRepository = new PrismaUsersRepository();
	const specialtiesRepository = new PrismaSpecialtiesRepository();

	const assignDoctorSpecialtyUseCase = new AssignDoctorSpecialtyUseCase(
		doctorSpecialtiesRepository,
		usersRepository,
		specialtiesRepository
	);

	return assignDoctorSpecialtyUseCase;
}
