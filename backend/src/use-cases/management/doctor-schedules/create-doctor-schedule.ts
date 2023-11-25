import { DoctorSchedulesRepository } from '@/repositories/doctor-schedules-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { DoctorScheduleAlreadyExistsError } from '@/use-cases/errors/doctor-schedule-already-exists-error';
import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { DoctorSchedule } from '@prisma/client';
import dayjs from 'dayjs';

interface CreateDoctorScheduleUseCaseRequest {
	doctorId: string;
	date: Date;
	startTime: Date;
	endTime: Date;
	isScheduled: boolean;
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
		date,
		startTime,
		endTime,
		isScheduled,
		updatedBy,
	}: CreateDoctorScheduleUseCaseRequest): Promise<CreateDoctorScheduleUseCaseResponse> {
		const doctor = await this.usersRepository.findDoctorById(doctorId);

		if (!doctor) {
			throw new ResourceNotFoundError();
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

		const doctorSchedule = await this.doctorSchedulesRepository.create({
			doctorId: doctor.id,
			date,
			startTime,
			endTime,
			isScheduled,
			updatedBy,
		});

		return { doctorSchedule };
	}
}
