import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { GetAllSpecialtiesUseCase } from '../specialties/get-all-specialties';

export function makeGetAllSpecialtiesUseCase() {
	const specialtiesRepository = new PrismaSpecialtiesRepository();
	const getAllSpecialtiesUseCase = new GetAllSpecialtiesUseCase(
		specialtiesRepository
	);

	return getAllSpecialtiesUseCase;
}
