import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import dayjs from 'dayjs';
import { DoctorScheduleOutdatedError } from '../errors/doctor-schedule-outdated-error';
import { UsersRepository } from '@/repositories/users-repository';

interface CancelAppointmentUseCaseRequest {
	appointmentNumber: number;
	doctorId: string;
}

export class CancelAppointmentUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private usersRepository: UsersRepository,
		private doctorSchedulesRepository: DoctorSchedulesRepository
	) {}

	async execute({
		appointmentNumber,
		doctorId,
	}: CancelAppointmentUseCaseRequest): Promise<void> {
		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentsRepository.findById(
			appointmentNumber,
			doctorId
		);

		if (!appointment) {
			throw new ResourceNotFoundError();
		}

		const doctorSchedule = await this.doctorSchedulesRepository.findById(
			appointment.doctorScheduleId
		);

		if (!doctorSchedule) {
			throw new ResourceNotFoundError();
		}

		const outdatedSchedule = dayjs().isAfter(doctorSchedule.startTime);

		if (outdatedSchedule) {
			throw new DoctorScheduleOutdatedError();
		}

		doctorSchedule.isScheduled = false;
		await this.doctorSchedulesRepository.update(doctorSchedule);

		await this.appointmentsRepository.cancel(
			appointment.appointmentNumber,
			doctor.id
		);
	}
}
