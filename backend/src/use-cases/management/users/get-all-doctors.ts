import { UsersRepository } from '@/repositories/users-repository';
import { Doctor } from '@prisma/client';

interface getAllDoctorsUseCaseResponse {
	doctors: Doctor[] | null;
}

export class GetAllDoctorsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<getAllDoctorsUseCaseResponse> {
		const doctors = await this.usersRepository.getAllDoctors();

		return { doctors };
	}
}
