import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface getAllUsersUseCaseRequest {
	page: number;
}

interface getAllUsersUseCaseResponse {
	users: User[] | null;
	totalPages: number;
}

export class GetAllUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		page,
	}: getAllUsersUseCaseRequest): Promise<getAllUsersUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.getAllUsers(page);

		return { users: data, totalPages };
	}
}
