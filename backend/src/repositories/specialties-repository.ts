import { Prisma, Specialty } from '@prisma/client';

export interface SpecialtiesRepository {
	findById(id: string): Promise<Specialty | null>;
	findByName(name: string): Promise<Specialty | null>;
	create(data: Prisma.SpecialtyCreateInput): Promise<Specialty>;
	getAll(): Promise<Specialty[] | null>;
}
