import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetDoctorSchedulesUseCase } from '../management/doctor-schedules/get-doctor-schedules';

export function makeGetDoctorSchedulesUseCase() {
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();
	const usersRepository = new PrismaUsersRepository();

	const getDoctorSchedulesUseCase = new GetDoctorSchedulesUseCase(
		doctorSchedulesRepository,
		usersRepository
	);

	return getDoctorSchedulesUseCase;
}
