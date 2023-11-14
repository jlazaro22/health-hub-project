import { RolesRepository } from '@/repositories/roles-repository';
import { Role } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetRoleUseCaseRequest {
	id: string;
}

interface GetRoleUseCaseResponse {
	role: Role;
}

export class GetRoleUseCase {
	constructor(private rolesRepository: RolesRepository) {}

	async execute({
		id,
	}: GetRoleUseCaseRequest): Promise<GetRoleUseCaseResponse> {
		const role = await this.rolesRepository.findById(id);

		if (!role) {
			throw new ResourceNotFoundError();
		}

		return { role };
	}
}
