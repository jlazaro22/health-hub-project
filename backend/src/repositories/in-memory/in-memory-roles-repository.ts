import { Role } from '@prisma/client';
import { RolesRepository } from '../roles-repository';
import { randomUUID } from 'crypto';

export class InMemoryRolesRepository implements RolesRepository {
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
		const role = this.roles.find((item) => item.id === id);

		if (!role) {
			return null;
		}

		return role;
	}

	async getAllRoles() {
		return this.roles;
	}
}
