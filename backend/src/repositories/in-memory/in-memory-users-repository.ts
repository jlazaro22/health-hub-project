import { Prisma, Role, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];
	public roles: Role[] = [];

	constructor() {
		const roleNames: string[] = [
			'ADMINISTRADOR',
			'COLABORADOR',
			'MEDICO',
			'PACIENTE',
		];

		roleNames.map((name) => {
			let role = {
				id: randomUUID(),
				name,
			};

			this.roles.push(role);
		});
	}

	async findById(id: string) {
		const user = this.users.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			createdAt: new Date(),
			updatedAt: new Date(),
			roleId: data.roleId,
		};

		this.users.push(user);

		return user;
	}

	async getRole(name: string) {
		name = name.trim().toUpperCase();

		const role = this.roles.find((item) => item.name === name);

		if (!role) {
			return null;
		}

		return role;
	}
}
