import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { CreateMedicineUseCase } from '../management/medicines/create-medicine';
import { PrismaMedicinesRepository } from '@/repositories/prisma/prisma-medicines-repository';

export function makeCreateMedicineUseCase() {
	const medicinesRepository = new PrismaMedicinesRepository();
	const createMedicineUseCase = new CreateMedicineUseCase(medicinesRepository);

	return createMedicineUseCase;
}
