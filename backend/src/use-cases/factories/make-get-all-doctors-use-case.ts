import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetAllDoctorsUseCase } from '../doctors/get-all-doctors';

export function makeGetAllDoctorsUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const getAllDoctorsUseCase = new GetAllDoctorsUseCase(usersRepository);

	return getAllDoctorsUseCase;
}
