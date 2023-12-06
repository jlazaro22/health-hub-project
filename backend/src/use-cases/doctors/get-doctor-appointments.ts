import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AppointmentDoctorNotProvidedError } from '../errors/appointment-doctor-not-provided-error';

interface GetDoctorAppointmentsUseCaseRequest {
	doctorId: string | undefined;
	loggedUserId: string;
	loggedUserRole: string;
}

interface GetDoctorAppointmentsUseCaseResponse {
	appointments: Appointment[] | null;
}

export class GetDoctorAppointmentsUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		doctorId,
		loggedUserId,
		loggedUserRole,
	}: GetDoctorAppointmentsUseCaseRequest): Promise<GetDoctorAppointmentsUseCaseResponse> {
		if (loggedUserRole === 'MEDICO') {
			const doctor = await this.usersRepository.findDoctorByUserId(
				loggedUserId
			);

			if (!doctor) {
				throw new ResourceNotFoundError();
			}

			const appointments = await this.appointmentsRepository.findByDoctorId(
				doctor.id
			);

			return { appointments };
		} else {
			if (!doctorId) {
				throw new AppointmentDoctorNotProvidedError();
			}

			const doctor = await this.usersRepository.findDoctorById(doctorId);

			if (!doctor) {
				throw new ResourceNotFoundError();
			}

			const appointments = await this.appointmentsRepository.findByDoctorId(
				doctor.id
			);

			return { appointments };
		}
	}
}
