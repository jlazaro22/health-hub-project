import { DoctorSpecialtiesRepository } from '@/repositories/doctor-specialties-repository';
import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SpecialtiesOnDoctors } from '@prisma/client';

interface AssignDoctorSpecialtyUseCaseRequest {
	doctorId: string;
	specialtyId: string;
}

interface AssignDoctorSpecialtyUseCaseResponse {
	doctorSpecialty: SpecialtiesOnDoctors;
}

export class AssignDoctorSpecialtyUseCase {
	constructor(
		private doctorSpecialtiesRepository: DoctorSpecialtiesRepository,
		private usersRepository: UsersRepository,
		private specialtiesRepository: SpecialtiesRepository
	) {}

	async execute({
		doctorId,
		specialtyId,
	}: AssignDoctorSpecialtyUseCaseRequest): Promise<AssignDoctorSpecialtyUseCaseResponse> {
		const specialty = await this.specialtiesRepository.findById(specialtyId);

		if (!specialty) {
			throw new ResourceNotFoundError();
		}

		const doctorSpecialty = await this.doctorSpecialtiesRepository.create({
			doctorId,
			specialtyId: specialty.id,
		});

		return { doctorSpecialty };
	}
}
