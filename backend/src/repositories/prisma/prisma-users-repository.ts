import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({
			include: {
				role: {
					select: {
						name: true,
					},
				},
			},
			where: {
				id,
			},
		});

		return user;
	}

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

	async getRole(name: string) {
		name = name.trim().toUpperCase();

		const role = await prisma.role.findUnique({
			where: {
				name,
			},
		});

		return role;
	}
}
