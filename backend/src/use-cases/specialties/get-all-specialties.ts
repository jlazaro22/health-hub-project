import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { Specialty } from '@prisma/client';

interface GetAllSpecialtiesUseCaseRequest {
	page: number;
}

interface GetAllSpecialtiesUseCaseResponse {
	specialties: Specialty[];
	totalPages: number;
}

export class GetAllSpecialtiesUseCase {
	constructor(private specialtiesRepository: SpecialtiesRepository) {}

	async execute({
		page,
	}: GetAllSpecialtiesUseCaseRequest): Promise<GetAllSpecialtiesUseCaseResponse> {
		const { data, totalPages } = await this.specialtiesRepository.getAll(page);

		return { specialties: data, totalPages };
	}
}
