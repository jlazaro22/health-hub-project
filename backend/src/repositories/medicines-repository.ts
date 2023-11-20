import { Medicine, Prisma } from '@prisma/client';

export interface MedicinesRepository {
	findById(id: string): Promise<Medicine | null>;
	findByName(name: string): Promise<Medicine | null>;
	create(data: Prisma.MedicineCreateInput): Promise<Medicine>;
}
