import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { ProfileNameInvalidError } from './errors/profile-name-invalid-error';

describe('RegisterUseCase', () => {
	it('should register the user', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new RegisterUseCase(usersRepository);

		const { user } = await sut.execute({
			name: 'John Smith',
			email: 'jsmith@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new RegisterUseCase(usersRepository);

		const { user } = await sut.execute({
			name: 'John Smith',
			email: 'jsmith@example.com',
			password: '123456',
		});

		const checkPasswordHash = await compare('123456', user.passwordHash);

		expect(checkPasswordHash).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new RegisterUseCase(usersRepository);

		const email = 'jsmith@example.com';

		await sut.execute({
			name: 'John Smith',
			email,
			password: '123456',
		});

		await expect(() => {
			return sut.execute({
				name: 'John Smith',
				email,
				password: '123456',
			});
		}).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('should only be registered with a valid profileId', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new RegisterUseCase(usersRepository);

		const profileName = 'invalidProfileName';

		await expect(() => {
			return sut.execute({
				name: 'John Smith',
				email: 'jsmith@example.com',
				password: '123456',
				profileName,
			});
		}).rejects.toBeInstanceOf(ProfileNameInvalidError);
	});
});
