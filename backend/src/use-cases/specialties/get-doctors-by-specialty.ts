import { DoctorSpecialtiesRepository } from '@/repositories/doctor-specialties-repository';
import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SpecialtiesOnDoctors } from '@prisma/client';

interface GetDoctorsBySpecialtyUseCaseRequest {
	specialtyId: string;
	page: number;
}

interface GetDoctorsBySpecialtyUseCaseResponse {
	doctorsBySpecialty: SpecialtiesOnDoctors[];
	totalPages: number;
}

export class GetDoctorsBySpecialtyUseCase {
	constructor(
		private doctorSpecialtiesRepository: DoctorSpecialtiesRepository,
		private specialtiesRepository: SpecialtiesRepository
	) {}

	async execute({
		specialtyId,
		page,
	}: GetDoctorsBySpecialtyUseCaseRequest): Promise<GetDoctorsBySpecialtyUseCaseResponse> {
		const specialty = await this.specialtiesRepository.findById(specialtyId);

		if (!specialty) {
			throw new ResourceNotFoundError();
		}

		const { data, totalPages } =
			await this.doctorSpecialtiesRepository.findBySpecialtyId(
				specialty.id,
				page
			);

		return { doctorsBySpecialty: data, totalPages };
	}
}
