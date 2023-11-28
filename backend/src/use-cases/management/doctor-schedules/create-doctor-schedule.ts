import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { DoctorScheduleAlreadyExistsError } from '@/use-cases/errors/doctor-schedule-already-exists-error';
import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { ScheduleOutsideWorkingHoursError } from '@/use-cases/errors/schedule-outside-working-hours-error';
import { DoctorSchedule } from '@prisma/client';
import dayjs from 'dayjs';

interface CreateDoctorScheduleUseCaseRequest {
	doctorId: string;
	startTime: Date;
	updatedBy: string;
}

interface CreateDoctorScheduleUseCaseResponse {
	doctorSchedule: DoctorSchedule;
}

export class CreateDoctorScheduleUseCase {
	constructor(
		private doctorSchedulesRepository: DoctorSchedulesRepository,
		private usersRepository: UsersRepository
	) {}

	async execute({
		doctorId,
		startTime,
		updatedBy,
	}: CreateDoctorScheduleUseCaseRequest): Promise<CreateDoctorScheduleUseCaseResponse> {
		const date = dayjs(startTime)
			.set('hour', 0)
			.set('minute', 0)
			.set('second', 0)
			.toDate();
		const endTime = dayjs(startTime).add(30, 'minute').toDate();

		const startOfWorkingDay = dayjs(date)
			.set('hour', 9)
			.set('minute', 0)
			.set('second', 0);
		const endOfWorkingDay = dayjs(date)
			.set('hour', 18)
			.set('minute', 0)
			.set('second', 0);
		const outsideWorkingHours =
			dayjs(startTime).isBefore(startOfWorkingDay) ||
			dayjs(startTime).add(30, 'minute').isAfter(endOfWorkingDay);

		if (outsideWorkingHours) {
			throw new ScheduleOutsideWorkingHoursError();
		}

		const scheduleExists =
			await this.doctorSchedulesRepository.findExistentByDoctorId(
				doctorId,
				date,
				startTime,
				endTime
			);

		if (scheduleExists) {
			throw new DoctorScheduleAlreadyExistsError();
		}

		const outdatedSchedule = dayjs().isAfter(startTime);

		if (outdatedSchedule) {
			throw new DoctorScheduleOutdatedError();
		}

		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
		}

		const doctorSchedule = await this.doctorSchedulesRepository.create({
			doctorId: doctor.id,
			date,
			startTime,
			endTime,
			updatedBy,
		});

		return { doctorSchedule };
	}
}
