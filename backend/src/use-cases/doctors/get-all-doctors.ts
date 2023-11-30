import { UsersRepository } from '@/repositories/users-repository';
import { Doctor } from '@prisma/client';

interface getAllDoctorsUseCaseRequest {
	page: number;
}

interface getAllDoctorsUseCaseResponse {
	doctors: Doctor[];
	totalPages: number;
}

export class GetAllDoctorsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		page,
	}: getAllDoctorsUseCaseRequest): Promise<getAllDoctorsUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.getAllDoctors(page);

		return { doctors: data, totalPages };
	}
}
