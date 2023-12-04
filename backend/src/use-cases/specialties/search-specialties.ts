import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { Specialty } from '@prisma/client';

interface SearchSpecialtiesUseCaseRequest {
	query: string;
	page: number;
}

interface SearchSpecialtiesUseCaseResponse {
	specialties: Specialty[];
	totalPages: number;
}

export class SearchSpecialtiesUseCase {
	constructor(private specialtiesRepository: SpecialtiesRepository) {}

	async execute({
		query,
		page,
	}: SearchSpecialtiesUseCaseRequest): Promise<SearchSpecialtiesUseCaseResponse> {
		const { data, totalPages } = await this.specialtiesRepository.searchMany(
			query,
			page
		);

		return { specialties: data, totalPages };
	}
}
