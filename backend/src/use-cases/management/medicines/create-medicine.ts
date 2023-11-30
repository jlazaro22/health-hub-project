import { MedicinesRepository } from '@/repositories/medicines-repository';
import { MedicineAlreadyExistsError } from '@/use-cases/errors/medicine-already-exists-error';
import { Medicine } from '@prisma/client';

interface CreateMedicineUseCaseRequest {
	name: string;
	description: string | undefined;
}

interface CreateMedicineUseCaseResponse {
	medicine: Medicine;
}

export class CreateMedicineUseCase {
	constructor(private medicinesRepository: MedicinesRepository) {}

	async execute({
		name,
		description,
	}: CreateMedicineUseCaseRequest): Promise<CreateMedicineUseCaseResponse> {
		const medicineExists = await this.medicinesRepository.findByName(name);

		if (medicineExists) {
			throw new MedicineAlreadyExistsError();
		}

		const medicine = await this.medicinesRepository.create({
			name,
			description,
		});

		return { medicine };
	}
}
