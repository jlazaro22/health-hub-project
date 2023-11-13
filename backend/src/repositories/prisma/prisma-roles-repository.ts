import { prisma } from '@/lib/prisma';
import { RolesRepository } from '../roles-repository';

export class PrismaRolesRepository implements RolesRepository {
	async getAllRoles() {
		const roles = await prisma.role.findMany();

		return roles;
	}
}
