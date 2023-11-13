import { Role } from '@prisma/client';

export interface RolesRepository {
	getAllRoles(): Promise<Role[] | null>;
}
