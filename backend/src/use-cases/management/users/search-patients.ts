import { UsersRepository } from '@/repositories/users-repository';
import { Patient } from '@prisma/client';

interface SearchPatientsUseCaseRequest {
	query: string;
	page: number;
}

interface SearchPatientsUseCaseResponse {
	patients: Patient[];
	totalPages: number;
}

export class SearchPatientsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		query,
		page,
	}: SearchPatientsUseCaseRequest): Promise<SearchPatientsUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.searchManyPatients(
			query,
			page
		);

		return { patients: data, totalPages };
	}
}
