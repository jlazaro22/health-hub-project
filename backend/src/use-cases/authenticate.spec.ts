import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should be able to authenticate', async () => {
		const patientProfile = await usersRepository.getProfile('paciente');

		if (!patientProfile) {
			throw new ResourceNotFoundError();
		}

		await usersRepository.create({
			name: 'John Smith',
			email: 'jsmith@example.com',
			passwordHash: await hash('123456', 6),
			profileId: patientProfile.id,
		});

		const { user } = await sut.execute({
			email: 'jsmith@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() =>
			sut.execute({ email: 'jsmith@example.com', password: '123456' })
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		const patientProfile = await usersRepository.getProfile('paciente');

		if (!patientProfile) {
			throw new ResourceNotFoundError();
		}

		await usersRepository.create({
			name: 'John Smith',
			email: 'jsmith@example.com',
			passwordHash: await hash('123456', 6),
			profileId: patientProfile.id,
		});

		await expect(() =>
			sut.execute({ email: 'jsmith@example.com', password: '111111' })
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
