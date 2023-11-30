import { Prisma } from '@prisma/client';
import { MedicinesRepository } from '../medicines-repository';
import { prisma } from '@/lib/prisma';

export class PrismaMedicinesRepository implements MedicinesRepository {
	async findById(id: string) {
		const medicine = await prisma.medicine.findUnique({
			where: {
				id,
			},
		});

		return medicine;
	}

	async findByName(name: string) {
		const medicine = await prisma.medicine.findUnique({
			where: {
				name,
			},
		});

		return medicine;
	}

	async create(data: Prisma.MedicineCreateInput) {
		const medicine = await prisma.medicine.create({ data });

		return medicine;
	}

	async getAll(page: number) {
		const totalItems = await prisma.medicine.count();
		const totalPages = Math.ceil(totalItems / 10);

		const medicines = await prisma.medicine.findMany({
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: medicines, totalPages };
	}

	async searchMany(query: string, page: number) {
		const totalItems = await prisma.medicine.count({
			where: {
				name: {
					contains: query,
					mode: 'insensitive',
				},
			},
		});
		const totalPages = Math.ceil(totalItems / 10);

		const medicines = await prisma.medicine.findMany({
			where: {
				name: {
					contains: query,
					mode: 'insensitive',
				},
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: medicines, totalPages };
	}
}
