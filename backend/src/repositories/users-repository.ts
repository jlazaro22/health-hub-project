import { Prisma, Role, User } from '@prisma/client';

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	getRole(name: string): Promise<Role | null>;
}
