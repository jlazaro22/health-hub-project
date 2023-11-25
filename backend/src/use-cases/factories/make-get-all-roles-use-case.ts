import { PrismaRolesRepository } from '@/repositories/prisma/prisma-roles-repository';
import { GetAllRolesUseCase } from '../management/roles/get-all-roles';

export function makeGetAllRolesUseCase() {
	const rolesRepository = new PrismaRolesRepository();
	const getAllRolesUseCase = new GetAllRolesUseCase(rolesRepository);

	return getAllRolesUseCase;
}
