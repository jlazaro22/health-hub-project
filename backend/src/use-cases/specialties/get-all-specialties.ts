import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { Specialty } from '@prisma/client';

interface GetAllSpecialtiesUseCaseResponse {
	specialties: Specialty[] | null;
}

export class GetAllSpecialtiesUseCase {
	constructor(private specialtiesRepository: SpecialtiesRepository) {}

	async execute(): Promise<GetAllSpecialtiesUseCaseResponse> {
		const specialties = await this.specialtiesRepository.getAll();

		return { specialties };
	}
}
