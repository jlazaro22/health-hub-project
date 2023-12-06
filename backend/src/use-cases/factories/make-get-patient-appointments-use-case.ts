import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetPatientAppointmentsUseCase } from '../patients/get-patient-appointments';

export function makeGetPatientAppointmentsUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const usersRepository = new PrismaUsersRepository();

	const getPatientAppointmentsUseCase = new GetPatientAppointmentsUseCase(
		appointmentsRepository,
		usersRepository
	);

	return getPatientAppointmentsUseCase;
}
