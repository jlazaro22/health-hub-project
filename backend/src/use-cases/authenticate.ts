import { compare } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const checkPasswordMatches = await compare(password, user.passwordHash);

		if (!checkPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { user };
	}
}
