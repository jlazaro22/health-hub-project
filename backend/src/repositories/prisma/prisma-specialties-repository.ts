import { Prisma } from '@prisma/client';
import { SpecialtiesRepository } from '../specialties-repository';
import { prisma } from '@/lib/prisma';

export class PrismaSpecialtiesRepository implements SpecialtiesRepository {
	async findById(id: string) {
		const specialty = await prisma.specialty.findUnique({
			where: {
				id,
			},
		});

		return specialty;
	}

	async findByName(name: string) {
		const specialty = await prisma.specialty.findFirst({
			where: {
				name: {
					contains: name,
				},
			},
		});

		return specialty;
	}

	async create(data: Prisma.SpecialtyCreateInput) {
		const specialty = await prisma.specialty.create({ data });

		return specialty;
	}

	async getAll(page: number) {
		const totalItems = await prisma.specialty.count();
		const totalPages = Math.ceil(totalItems / 10);

		const specialties = await prisma.specialty.findMany({
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: specialties, totalPages };
	}
}
