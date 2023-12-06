import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { SpecialtiesRepository } from '@/repositories/specialties-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { DoctorScheduleAlreadyTakenError } from '../errors/doctor-schedule-already-taken-error';
import dayjs from 'dayjs';
import { DoctorScheduleOutdatedError } from '../errors/doctor-schedule-outdated-error';
import { AppointmentPatientNotProvidedError } from '../errors/appointment-patient-not-provided-error';

interface CreateAppointmentUseCaseRequest {
	doctorId: string;
	specialtyId: string;
	patientId: string | undefined;
	doctorScheduleId: string;
	updatedBy: string;
	loggedUserRole: string;
}

interface CreateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class CreateAppointmentUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private usersRepository: UsersRepository,
		private specialtiesRepository: SpecialtiesRepository,
		private doctorSchedulesRepository: DoctorSchedulesRepository
	) {}

	async execute({
		doctorId,
		specialtyId,
		patientId,
		doctorScheduleId,
		updatedBy,
		loggedUserRole,
	}: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
		const newAppointmentNumber =
			(await this.appointmentsRepository.countByDoctorId(doctorId)) + 1;

		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const specialty = await this.specialtiesRepository.findById(specialtyId);

		if (!specialty) {
			throw new ResourceNotFoundError();
		}

		let appointmentPatientId: string;

		if (loggedUserRole === 'PACIENTE') {
			const patient = await this.usersRepository.findPatientByUserId(updatedBy);

			if (!patient) {
				throw new ResourceNotFoundError();
			}

			appointmentPatientId = patient.id;
		} else {
			if (!patientId) {
				throw new AppointmentPatientNotProvidedError();
			}

			const patient = await this.usersRepository.findPatientById(patientId);

			if (!patient) {
				throw new ResourceNotFoundError();
			}

			appointmentPatientId = patient.id;
		}

		const doctorSchedule = await this.doctorSchedulesRepository.findById(
			doctorScheduleId
		);

		if (!doctorSchedule) {
			throw new ResourceNotFoundError();
		}

		const outdatedSchedule = dayjs().isAfter(doctorSchedule.startTime);

		if (outdatedSchedule) {
			throw new DoctorScheduleOutdatedError();
		}

		if (doctorSchedule.isScheduled) {
			throw new DoctorScheduleAlreadyTakenError();
		}

		doctorSchedule.isScheduled = true;
		await this.doctorSchedulesRepository.update(doctorSchedule);

		const appointment = await this.appointmentsRepository.create({
			appointmentNumber: newAppointmentNumber,
			doctorId,
			specialtyId,
			patientId: appointmentPatientId,
			doctorScheduleId,
			updatedBy,
		});

		return { appointment };
	}
}
