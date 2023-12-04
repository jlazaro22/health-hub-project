import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface SearchUsersUseCaseRequest {
	query: string;
	page: number;
}

interface SearchUsersUseCaseResponse {
	users: User[] | null;
	totalPages: number;
}

export class SearchUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		query,
		page,
	}: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.searchManyUsers(
			query,
			page
		);

		return { users: data, totalPages };
	}
}
