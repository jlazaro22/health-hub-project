import { Prisma, Profile, User } from '@prisma/client';

export interface UsersRepository {
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	getProfile(name: string): Promise<Profile | null>;
}
