import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { GetAllSchedulesUseCase } from '../doctor-schedules/get-all-schedules';

export function makeGetAllSchedulesUseCase() {
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();
	const getAllSchedulesUseCase = new GetAllSchedulesUseCase(
		doctorSchedulesRepository
	);

	return getAllSchedulesUseCase;
}
