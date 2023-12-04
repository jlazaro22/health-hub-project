import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { SearchUsersUseCase } from '../management/users/search-users';

export function makeSearchUsersUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const searchUsersUseCase = new SearchUsersUseCase(usersRepository);

	return searchUsersUseCase;
}
