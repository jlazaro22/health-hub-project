import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AppointmentPatientNotProvidedError } from '../errors/appointment-patient-not-provided-error';

interface GetPatientAppointmentsUseCaseRequest {
	patientId: string | undefined;
	loggedUserId: string;
	loggedUserRole: string;
}

interface GetPatientAppointmentsUseCaseResponse {
	appointments: Appointment[] | null;
}

export class GetPatientAppointmentsUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		patientId,
		loggedUserId,
		loggedUserRole,
	}: GetPatientAppointmentsUseCaseRequest): Promise<GetPatientAppointmentsUseCaseResponse> {
		if (loggedUserRole === 'PACIENTE') {
			const patient = await this.usersRepository.findPatientByUserId(
				loggedUserId
			);

			if (!patient) {
				throw new ResourceNotFoundError();
			}

			const appointments = await this.appointmentsRepository.findByPatientId(
				patient.id
			);

			return { appointments };
		} else {
			if (!patientId) {
				throw new AppointmentPatientNotProvidedError();
			}

			const patient = await this.usersRepository.findPatientById(patientId);

			if (!patient) {
				throw new ResourceNotFoundError();
			}

			const appointments = await this.appointmentsRepository.findByPatientId(
				patient.id
			);

			return { appointments };
		}
	}
}
