import { UsersRepository } from '@/repositories/users-repository';
import { Doctor } from '@prisma/client';

interface SearchDoctorsUseCaseRequest {
	query: string;
	page: number;
}

interface SearchDoctorsUseCaseResponse {
	doctors: Doctor[];
	totalPages: number;
}

export class SearchDoctorsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		query,
		page,
	}: SearchDoctorsUseCaseRequest): Promise<SearchDoctorsUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.searchManyDoctors(
			query,
			page
		);

		return { doctors: data, totalPages };
	}
}
