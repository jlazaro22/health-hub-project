import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { CreateDoctorScheduleUseCase } from '../management/doctor-schedules/create-doctor-schedule';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeCreateDoctorScheduleUseCase() {
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();
	const usersRepository = new PrismaUsersRepository();

	const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(
		doctorSchedulesRepository,
		usersRepository
	);

	return createDoctorScheduleUseCase;
}
