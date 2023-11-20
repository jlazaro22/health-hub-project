import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetAllPatientsUseCase } from '../management/users/get-all-patients';

export function makeGetAllPatientsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const getAllPatientsUseCase = new GetAllPatientsUseCase(usersRepository);

	return getAllPatientsUseCase;
}
