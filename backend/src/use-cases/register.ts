import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RoleNameInvalidError } from './errors/role-name-invalid-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
	role?: string;
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
		role,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const emailExists = await this.usersRepository.findByEmail(email);

		if (emailExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		if (!role) {
			const patientRole = await this.usersRepository.getRole('PACIENTE');

			if (!patientRole) {
				throw new RoleNameInvalidError(patientRole);
			}

			const user = await this.usersRepository.create({
				name,
				email,
				passwordHash,
				roleId: patientRole.id,
			});

			return { user };
		}

		const roleExists = await this.usersRepository.getRole(role);

		if (!roleExists) {
			throw new RoleNameInvalidError(role);
		}

		const user = await this.usersRepository.create({
			name,
			email,
			passwordHash,
			roleId: roleExists.id,
		});

		return { user };
	}
}
