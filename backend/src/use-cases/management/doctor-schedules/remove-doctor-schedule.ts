import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { DoctorScheduleAlreadyTakenError } from '@/use-cases/errors/doctor-schedule-already-taken-error';
import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import dayjs from 'dayjs';

interface RemoveDoctorScheduleUseCaseRequest {
	doctorId: string;
	doctorScheduleId: string;
}

export class RemoveDoctorScheduleUseCase {
	constructor(
		private doctorSchedulesRepository: DoctorSchedulesRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		doctorId,
		doctorScheduleId,
	}: RemoveDoctorScheduleUseCaseRequest): Promise<void> {
		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const doctorSchedule = await this.doctorSchedulesRepository.findById(
			doctorScheduleId
		);

		if (!doctorSchedule) {
			throw new ResourceNotFoundError();
		}

		if (doctorSchedule.isScheduled) {
			throw new DoctorScheduleAlreadyTakenError();
		}

		const outdatedSchedule = dayjs().isAfter(doctorSchedule.startTime);

		if (outdatedSchedule) {
			throw new DoctorScheduleOutdatedError();
		}

		await this.doctorSchedulesRepository.remove(doctorScheduleId);
	}
}
