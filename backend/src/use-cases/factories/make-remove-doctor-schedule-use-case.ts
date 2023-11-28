import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RemoveDoctorScheduleUseCase } from '../management/doctor-schedules/remove-doctor-schedule';

export function makeRemoveDoctorScheduleUseCase() {
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();
	const usersRepository = new PrismaUsersRepository();

	const removeDoctorScheduleUseCase = new RemoveDoctorScheduleUseCase(
		doctorSchedulesRepository,
		usersRepository
	);

	return removeDoctorScheduleUseCase;
}
