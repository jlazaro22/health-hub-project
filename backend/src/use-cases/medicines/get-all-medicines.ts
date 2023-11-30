import { MedicinesRepository } from '@/repositories/medicines-repository';
import { Medicine } from '@prisma/client';

interface GetAllMedicinesUseCaseRequest {
	page: number;
}

interface GetAllMedicinesUseCaseResponse {
	medicines: Medicine[];
	totalPages: number;
}

export class GetAllMedicinesUseCase {
	constructor(private medicinesRepository: MedicinesRepository) {}

	async execute({
		page,
	}: GetAllMedicinesUseCaseRequest): Promise<GetAllMedicinesUseCaseResponse> {
		const { data, totalPages } = await this.medicinesRepository.getAll(page);

		return { medicines: data, totalPages };
	}
}
