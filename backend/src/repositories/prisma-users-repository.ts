import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from './users-repository';

export class PrismaUsersRepository implements UsersRepository {
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = await prisma.user.create({ data });

		return user;
	}

	async getProfile(name: string) {
		const profile = await prisma.profile.findUnique({
			where: {
				name,
			},
		});

		return profile;
	}
}
