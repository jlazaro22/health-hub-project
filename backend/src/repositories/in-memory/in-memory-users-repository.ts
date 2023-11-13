import { Prisma, Profile, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];
	public profiles: Profile[] = [];

	constructor() {
		const profileNames: string[] = [
			'ADMINISTRADOR',
			'COLABORADOR',
			'MEDICO',
			'PACIENTE',
		];

		profileNames.map((name) => {
			let profile = {
				id: randomUUID(),
				name,
			};

			this.profiles.push(profile);
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
			profileId: data.profileId,
		};

		this.users.push(user);

		return user;
	}

	async getProfile(name: string) {
		name = name.trim().toUpperCase();

		const profile = this.profiles.find((item) => item.name === name);

		if (!profile) {
			return null;
		}

		return profile;
	}
}
