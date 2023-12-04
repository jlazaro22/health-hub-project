import { Prisma, Specialty } from '@prisma/client';

interface Paginable<T> {
	data: T[];
	totalPages: number;
}

export interface SpecialtiesRepository {
	findById(id: string): Promise<Specialty | null>;
	findByName(name: string): Promise<Specialty | null>;
	create(data: Prisma.SpecialtyCreateInput): Promise<Specialty>;
	searchMany(query: string, page: number): Promise<Paginable<Specialty>>;
}
