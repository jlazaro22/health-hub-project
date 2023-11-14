import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { RoleNameInvalidError } from '../errors/role-name-invalid-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('RegisterUseCase', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('should register the user', async () => {
		const { user } = await sut.execute({
			name: 'John Smith',
			email: 'jsmith@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Smith',
			email: 'jsmith@example.com',
			password: '123456',
		});

		const checkPasswordHash = await compare('123456', user.passwordHash);

		expect(checkPasswordHash).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
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

	it('should only be registered with a valid role name', async () => {
		const role = 'invalidRoleName';

		await expect(() => {
			return sut.execute({
				name: 'John Smith',
				email: 'jsmith@example.com',
				password: '123456',
				role,
			});
		}).rejects.toBeInstanceOf(RoleNameInvalidError);
	});
});
