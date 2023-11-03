import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { ProfileNameInvalidError } from './errors/profile-name-invalid-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
	profileName?: string;
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
		profileName,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const emailExists = await this.usersRepository.findByEmail(email);

		if (emailExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		if (!profileName) {
			const patientProfile = await this.usersRepository.getProfile('PACIENTE');

			if (!patientProfile) {
				throw new ProfileNameInvalidError(patientProfile);
			}

			const user = await this.usersRepository.create({
				name,
				email,
				passwordHash,
				profileId: patientProfile.id,
			});

			return { user };
		}

		const profileExists = await this.usersRepository.getProfile(profileName);

		if (!profileExists) {
			throw new ProfileNameInvalidError(profileName);
		}

		const user = await this.usersRepository.create({
			name,
			email,
			passwordHash,
			profileId: profileExists.id,
		});

		return { user };
	}
}
