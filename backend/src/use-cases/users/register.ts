import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { RoleNameInvalidError } from '../errors/role-name-invalid-error';
import { Gender, User } from '@prisma/client';
import { GenderInvalidError } from '../errors/gender-invalid-error';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthDate: Date;
	address?: string;
	phone?: string;
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
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
		gender,
		birthDate,
		address,
		phone,
		insuranceProvider,
		insurancePolicyNumber,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const emailExists = await this.usersRepository.findByEmail(email);

		if (emailExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

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

		const genderNormalized = gender.trim().toUpperCase();
		let genderEnum: Gender;

		if (genderNormalized === 'MALE' || genderNormalized === 'MASCULINO') {
			genderEnum = Gender.MASCULINO;
		} else if (
			genderNormalized === 'FEMALE' ||
			genderNormalized === 'FEMININO'
		) {
			genderEnum = Gender.FEMININO;
		} else {
			throw new GenderInvalidError();
		}

		await this.usersRepository.createPatient({
			gender: genderEnum,
			birthDate,
			userId: user.id,
			address,
			phone,
			insuranceProvider,
			insurancePolicyNumber,
		});

		return { user };
	}
}
