import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetAllDoctorsUseCase } from '../management/users/get-all-doctors';

export function makeGetAllDoctorsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const getAllDoctorsUseCase = new GetAllDoctorsUseCase(usersRepository);

	return getAllDoctorsUseCase;
}
