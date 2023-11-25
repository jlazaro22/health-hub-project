import { RolesRepository } from '@/repositories/roles-repository';
import { Role } from '@prisma/client';

interface GetAllRolesUseCaseResponse {
	roles: Role[] | null;
}

export class GetAllRolesUseCase {
	constructor(private rolesRepository: RolesRepository) {}

	async execute(): Promise<GetAllRolesUseCaseResponse> {
		const roles = await this.rolesRepository.getAllRoles();

		return { roles };
	}
}
