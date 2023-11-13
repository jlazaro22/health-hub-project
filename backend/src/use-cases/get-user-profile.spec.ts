import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {
		const patientProfile = await usersRepository.getProfile('paciente');

		if (!patientProfile) {
			throw new ResourceNotFoundError();
		}

		const createdUser = await usersRepository.create({
			name: 'John Smith',
			email: 'jsmith@example.com',
			passwordHash: await hash('123456', 6),
			profileId: patientProfile.id,
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to get user profile with invalid id', async () => {
		await expect(() =>
			sut.execute({ userId: 'invalid-id' })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
