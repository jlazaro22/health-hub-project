import { Prisma } from '@prisma/client';
import { DoctorSchedulesRepository } from '../doctor-schedules-repository';
import { prisma } from '@/lib/prisma';

export class PrismaDoctorSchedulesRepository
	implements DoctorSchedulesRepository
{
	async findExistentByDoctorId(
		doctorId: string,
		date: Date,
		startTime: Date,
		endTime: Date
	) {
		const doctorSchedule = await prisma.doctorSchedule.findFirst({
			where: { doctorId, date, startTime, endTime },
		});

		return doctorSchedule;
	}

	async findAllByDoctorId(id: string) {
		const doctorSchedules = await prisma.doctorSchedule.findMany({
			include: {
				doctor: {
					select: {
						user: {
							select: {
								name: true,
							},
						},
					},
				},
			},
			where: { doctorId: id },
		});

		return doctorSchedules;
	}

	async create(data: Prisma.DoctorScheduleUncheckedCreateInput) {
		const doctorSchedule = await prisma.doctorSchedule.create({
			data,
		});

		return doctorSchedule;
	}

	async getAll() {
		const doctorSchedules = await prisma.doctorSchedule.findMany();

		return doctorSchedules;
	}
}
