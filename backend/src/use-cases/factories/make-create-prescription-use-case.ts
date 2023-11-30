import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaMedicinesRepository } from '@/repositories/prisma/prisma-medicines-repository';
import { PrismaPrescriptionsRepository } from '@/repositories/prisma/prisma-prescriptions-repository';
import { CreatePrescriptionUseCase } from '../prescriptions/create';

export function makeCreatePrescriptionUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const medicinesRepository = new PrismaMedicinesRepository();
	const prescriptionsRepository = new PrismaPrescriptionsRepository();

	const createPrescriptionUseCase = new CreatePrescriptionUseCase(
		appointmentsRepository,
		medicinesRepository,
		prescriptionsRepository
	);

	return createPrescriptionUseCase;
}
