import { PrismaDoctorSpecialtiesRepository } from '@/repositories/prisma/prisma-doctor-specialties-repository';
import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { GetDoctorsBySpecialtyUseCase } from '../specialties/get-doctors-by-specialty';

export function makeGetDoctorsBySpecialtyUseCase() {
	const doctorSpecialtiesRepository = new PrismaDoctorSpecialtiesRepository();
	const specialtiesRepository = new PrismaSpecialtiesRepository();

	const getDoctorsBySpecialtyUseCase = new GetDoctorsBySpecialtyUseCase(
		doctorSpecialtiesRepository,
		specialtiesRepository
	);

	return getDoctorsBySpecialtyUseCase;
}
