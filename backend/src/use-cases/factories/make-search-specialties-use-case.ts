import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { SearchSpecialtiesUseCase } from '../specialties/search-specialties';

export function makeSearchSpecialtiesUseCase() {
	const specialtiesRepository = new PrismaSpecialtiesRepository();
	const searchSpecialtiesUseCase = new SearchSpecialtiesUseCase(
		specialtiesRepository
	);

	return searchSpecialtiesUseCase;
}
