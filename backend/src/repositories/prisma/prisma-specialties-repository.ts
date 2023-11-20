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
		const specialty = await prisma.specialty.findUnique({
			where: {
				name,
			},
		});

		return specialty;
	}

	async create(data: Prisma.SpecialtyCreateInput) {
		const specialty = await prisma.specialty.create({ data });

		return specialty;
	}
}
