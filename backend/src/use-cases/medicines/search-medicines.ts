import { MedicinesRepository } from '@/repositories/medicines-repository';
import { Medicine } from '@prisma/client';

interface SearchMedicinesUseCaseRequest {
	query: string;
	page: number;
}

interface SearchMedicinesUseCaseResponse {
	medicines: Medicine[];
	totalPages: number;
}

export class SearchMedicinesUseCase {
	constructor(private medicinesRepository: MedicinesRepository) {}

	async execute({
		query,
		page,
	}: SearchMedicinesUseCaseRequest): Promise<SearchMedicinesUseCaseResponse> {
		const { data, totalPages } = await this.medicinesRepository.searchMany(
			query,
			page
		);

		return { medicines: data, totalPages };
	}
}
