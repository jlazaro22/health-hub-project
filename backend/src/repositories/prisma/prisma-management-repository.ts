import { Prisma } from '@prisma/client';
import { ManagementRepository } from '../management-repository';
import { prisma } from '@/lib/prisma';

export class PrismaManagementRepository implements ManagementRepository {
	async createDoctorsSpecialty(data: Prisma.SpecialtyCreateInput) {
		const specialty = await prisma.specialty.create({ data });

		return specialty;
	}
}
