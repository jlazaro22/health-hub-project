import { prisma } from '@/lib/prisma';
import { RolesRepository } from '../roles-repository';

export class PrismaRolesRepository implements RolesRepository {
	async findById(id: string) {
		const role = await prisma.role.findUnique({
			where: {
				id,
			},
		});

		return role;
	}

	async getAllRoles() {
		const roles = await prisma.role.findMany();

		return roles;
	}
}
