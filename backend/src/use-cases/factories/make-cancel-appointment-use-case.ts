import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaDoctorSchedulesRepository } from '@/repositories/prisma/prisma-doctor-schedules-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CancelAppointmentUseCase } from '../appointments/cancel';

export function makeCancelAppointmentUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const usersRepository = new PrismaUsersRepository();
	const doctorSchedulesRepository = new PrismaDoctorSchedulesRepository();

	const cancelAppointmentUseCase = new CancelAppointmentUseCase(
		appointmentsRepository,
		usersRepository,
		doctorSchedulesRepository
	);

	return cancelAppointmentUseCase;
}
