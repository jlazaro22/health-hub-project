import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface getAllUsersUseCaseResponse {
	users: User[] | null;
}

export class GetAllUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(): Promise<getAllUsersUseCaseResponse> {
		const users = await this.usersRepository.getAllUsers();

		return { users };
	}
}
