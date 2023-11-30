import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { SpecialtyAlreadyExistsError } from '@/use-cases/errors/specialty-already-exists-error';
import { Specialty } from '@prisma/client';

interface CreateSpecialtyUseCaseRequest {
	name: string;
	description: string;
}

interface CreateSpecialtyUseCaseResponse {
	specialty: Specialty;
}

export class CreateSpecialtyUseCase {
	constructor(private specialtiesRepository: SpecialtiesRepository) {}

	async execute({
		name,
		description,
	}: CreateSpecialtyUseCaseRequest): Promise<CreateSpecialtyUseCaseResponse> {
		const specialtyExists = await this.specialtiesRepository.findByName(name);

		if (specialtyExists) {
			throw new SpecialtyAlreadyExistsError();
		}

		const specialty = await this.specialtiesRepository.create({
			name,
			description,
		});

		return { specialty };
	}
}
