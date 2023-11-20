import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { RoleNameInvalidError } from '../../errors/role-name-invalid-error';
import { Gender, User } from '@prisma/client';
import { OperationNotAllowedError } from '../../errors/operation-not-allowed-error';
import { GenderInvalidError } from '../../errors/gender-invalid-error';

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
	role: string;
	loggedUserRole: string;
}

interface CreateUserUseCaseResponse {
	user: User;
}

interface CreatePatientRequest {
	gender: string;
	birthDate: Date;
	address?: string;
	phone?: string;
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
}

interface CreateDoctorRequest {
	gender: string;
	photoUrl?: string;
	birthDate?: Date;
	phone?: string;
	licenseNumber: string;
	licenseExpiryDate: Date;
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(
		{ name, email, password, role, loggedUserRole }: CreateUserUseCaseRequest,
		createPatientRequest?: CreatePatientRequest,
		createDoctorRequest?: CreateDoctorRequest
	): Promise<CreateUserUseCaseResponse> {
		const emailExists = await this.usersRepository.findByEmail(email);

		if (emailExists) {
			throw new UserAlreadyExistsError();
		}

		const roleExists = await this.usersRepository.getRole(role);

		if (!roleExists) {
			throw new RoleNameInvalidError(role);
		}

		if (
			(roleExists.name === 'ADMINISTRADOR' ||
				roleExists.name === 'COLABORADOR') &&
			loggedUserRole !== 'ADMINISTRADOR'
		) {
			throw new OperationNotAllowedError();
		}

		if (
			roleExists.name === 'MEDICO' &&
			loggedUserRole !== 'ADMINISTRADOR' &&
			loggedUserRole !== 'COLABORADOR'
		) {
			throw new OperationNotAllowedError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.usersRepository.create({
			name,
			email,
			passwordHash,
			roleId: roleExists.id,
		});

		if (roleExists.name === 'PACIENTE' && createPatientRequest) {
			const {
				gender,
				birthDate,
				address,
				phone,
				insuranceProvider,
				insurancePolicyNumber,
			} = createPatientRequest;

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
				userId: user.id,
				gender: genderEnum,
				birthDate,
				address,
				phone,
				insuranceProvider,
				insurancePolicyNumber,
			});
		}

		if (roleExists.name === 'MEDICO' && createDoctorRequest) {
			const {
				gender,
				photoUrl,
				birthDate,
				phone,
				licenseNumber,
				licenseExpiryDate,
			} = createDoctorRequest;

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

			await this.usersRepository.createDoctor({
				userId: user.id,
				gender: genderEnum,
				photoUrl,
				birthDate,
				phone,
				licenseNumber,
				licenseExpiryDate,
			});
		}

		return { user };
	}
}
