import { Role } from '@prisma/client';

export interface RolesRepository {
	findById(id: string): Promise<Role | null>;
	getAllRoles(): Promise<Role[] | null>;
}
