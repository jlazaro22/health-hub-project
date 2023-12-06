import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetDoctorAppointmentsUseCase } from '../doctors/get-doctor-appointments';

export function makeGetDoctorAppointmentsUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const usersRepository = new PrismaUsersRepository();

	const getDoctorAppointmentsUseCase = new GetDoctorAppointmentsUseCase(
		appointmentsRepository,
		usersRepository
	);

	return getDoctorAppointmentsUseCase;
}
