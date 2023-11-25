import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { PrismaSpecialtiesRepository } from '@/repositories/prisma/prisma-specialties-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateAppointmentUseCase } from '../appointments/create';

export function makeCreateAppointmentUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const usersRepository = new PrismaUsersRepository();
	const specialtiesRepository = new PrismaSpecialtiesRepository();
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();

	const createAppointmentUseCase = new CreateAppointmentUseCase(
		appointmentsRepository,
		usersRepository,
		specialtiesRepository,
		doctorSchedulesRepository
	);

	return createAppointmentUseCase;
}
