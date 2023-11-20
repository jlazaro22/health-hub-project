import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { CreateSpecialtyUseCase } from '../management/specialties/create-specialty';

export function makeCreateSpecialtyUseCase() {
	const specialtiesRepository = new PrismaSpecialtiesRepository();
	const createSpecialtyUseCase = new CreateSpecialtyUseCase(
		specialtiesRepository
	);

	return createSpecialtyUseCase;
}
