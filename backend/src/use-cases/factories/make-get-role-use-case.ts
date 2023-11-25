import { PrismaRolesRepository } from '@/repositories/prisma/prisma-roles-repository';
import { GetRoleUseCase } from '../management/roles/get-role';

export function makeGetRoleUseCase() {
	const rolesRepository = new PrismaRolesRepository();
	const getRoleUseCase = new GetRoleUseCase(rolesRepository);

	return getRoleUseCase;
}
