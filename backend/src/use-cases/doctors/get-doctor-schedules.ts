import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { DoctorSchedule } from '@prisma/client';

interface GetDoctorSchedulesUseCaseRequest {
	doctorId: string;
}

interface GetDoctorSchedulesUseCaseResponse {
	doctorSchedules: DoctorSchedule[] | null;
}

export class GetDoctorSchedulesUseCase {
	constructor(
		private doctorSchedulesRepository: DoctorSchedulesRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		doctorId,
	}: GetDoctorSchedulesUseCaseRequest): Promise<GetDoctorSchedulesUseCaseResponse> {
		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const doctorSchedules =
			await this.doctorSchedulesRepository.findAllByDoctorId(doctor.id);

		return { doctorSchedules };
	}
}
