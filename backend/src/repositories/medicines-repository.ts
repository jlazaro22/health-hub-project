import { Medicine, Prisma } from '@prisma/client';

interface Paginable<T> {
	data: T[];
	totalPages: number;
}

export interface MedicinesRepository {
	findById(id: string): Promise<Medicine | null>;
	findByName(name: string): Promise<Medicine | null>;
	create(data: Prisma.MedicineCreateInput): Promise<Medicine>;
	getAll(page: number): Promise<Paginable<Medicine>>;
	searchMany(query: string, page: number): Promise<Paginable<Medicine>>;
}
