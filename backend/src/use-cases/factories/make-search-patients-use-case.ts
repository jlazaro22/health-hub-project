import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { SearchPatientsUseCase } from '../management/patients/search-patients';

export function makeSearchPatientsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const searchPatientsUseCase = new SearchPatientsUseCase(usersRepository);

	return searchPatientsUseCase;
}
