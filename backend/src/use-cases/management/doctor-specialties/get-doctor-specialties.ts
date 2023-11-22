import { DoctorSpecialtiesRepository } from '@/repositories/doctor-specialties-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SpecialtiesOnDoctors } from '@prisma/client';

interface GetDoctorSpecialtiesUseCaseRequest {
	doctorId: string;
}

interface GetDoctorSpecialtiesUseCaseResponse {
	doctorSpecialties: SpecialtiesOnDoctors[] | null;
}

export class GetDoctorSpecialtiesUseCase {
	constructor(
		private doctorSpecialtiesRepository: DoctorSpecialtiesRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		doctorId,
	}: GetDoctorSpecialtiesUseCaseRequest): Promise<GetDoctorSpecialtiesUseCaseResponse> {
		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const doctorSpecialties =
			await this.doctorSpecialtiesRepository.findByDoctorId(doctor.id);

		return { doctorSpecialties };
	}
}
