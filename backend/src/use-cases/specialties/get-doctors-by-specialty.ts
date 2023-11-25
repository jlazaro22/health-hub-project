import { DoctorSpecialtiesRepository } from '@/repositories/doctor-specialties-repository';
import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SpecialtiesOnDoctors } from '@prisma/client';

interface GetDoctorsBySpecialtyUseCaseRequest {
	specialtyId: string;
}

interface GetDoctorsBySpecialtyUseCaseResponse {
	doctorsBySpecialty: SpecialtiesOnDoctors[] | null;
}

export class GetDoctorsBySpecialtyUseCase {
	constructor(
		private doctorSpecialtiesRepository: DoctorSpecialtiesRepository,
		private specialtiesRepository: SpecialtiesRepository
	) {}

	async execute({
		specialtyId,
	}: GetDoctorsBySpecialtyUseCaseRequest): Promise<GetDoctorsBySpecialtyUseCaseResponse> {
		const specialty = await this.specialtiesRepository.findById(specialtyId);

		if (!specialty) {
			throw new ResourceNotFoundError();
		}

		const doctorsBySpecialty =
			await this.doctorSpecialtiesRepository.findBySpecialtyId(specialty.id);

		return { doctorsBySpecialty };
	}
}
