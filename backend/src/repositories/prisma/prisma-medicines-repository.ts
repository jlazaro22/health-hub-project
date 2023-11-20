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
}
