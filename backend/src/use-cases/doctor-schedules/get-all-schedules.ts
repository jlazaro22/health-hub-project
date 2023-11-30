import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { DoctorSchedule } from '@prisma/client';

interface GetAllSchedulesUseCaseRequest {
	page: number;
}

interface GetAllSchedulesUseCaseResponse {
	doctorSchedules: DoctorSchedule[];
	totalPages: number;
}

export class GetAllSchedulesUseCase {
	constructor(private doctorSchedulesRepository: DoctorSchedulesRepository) {}

	async execute({
		page,
	}: GetAllSchedulesUseCaseRequest): Promise<GetAllSchedulesUseCaseResponse> {
		const { data, totalPages } = await this.doctorSchedulesRepository.getAll(
			page
		);

		return { doctorSchedules: data, totalPages };
	}
}
