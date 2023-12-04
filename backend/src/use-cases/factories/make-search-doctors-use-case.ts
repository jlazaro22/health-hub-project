import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { SearchDoctorsUseCase } from '../doctors/search-doctors';

export function makeSearchDoctorsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const searchDoctorsUseCase = new SearchDoctorsUseCase(usersRepository);

	return searchDoctorsUseCase;
}
