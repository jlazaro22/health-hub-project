import { PrismaDoctorSpecialtiesRepository } from '@/repositories/prisma/prisma-doctor-specialties-repository';
import { AssignDoctorSpecialtyUseCase } from '../management/doctor-specialties/assign-doctor-specialty';
import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';

export function makeAssignDoctorSpecialtyUseCase() {
	const doctorSpecialtiesRepository = new PrismaDoctorSpecialtiesRepository();
	const specialtiesRepository = new PrismaSpecialtiesRepository();

	const assignDoctorSpecialtyUseCase = new AssignDoctorSpecialtyUseCase(
		doctorSpecialtiesRepository,
		specialtiesRepository
	);

	return assignDoctorSpecialtyUseCase;
}
