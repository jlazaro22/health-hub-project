import { DoctorSchedule, Prisma } from '@prisma/client';
import { DoctorSchedulesRepository } from '../doctor-schedules-repository';
import { prisma } from '@/lib/prisma';

export class PrismaDoctorSchedulesRepository
	implements DoctorSchedulesRepository
{
	async findById(id: string) {
		const doctorSchedule = await prisma.doctorSchedule.findUnique({
			where: { id },
		});

		return doctorSchedule;
	}

	async findExistentByDoctorId(
		doctorId: string,
		date: Date,
		startTime: Date,
		endTime: Date
	) {
		const doctorSchedule = await prisma.doctorSchedule.findFirst({
			where: {
				doctorId,
				date,
				startTime,
				endTime,
			},
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
			where: {
				doctorId: id,
			},
		});

		return doctorSchedules;
	}

	async create(data: Prisma.DoctorScheduleUncheckedCreateInput) {
		const doctorSchedule = await prisma.doctorSchedule.create({
			data,
		});

		return doctorSchedule;
	}

	async update(data: DoctorSchedule) {
		const doctorSchedule = await prisma.doctorSchedule.update({
			where: {
				id: data.id,
			},
			data,
		});

		return doctorSchedule;
	}

	async remove(id: string) {
		await prisma.doctorSchedule.delete({
			where: {
				id,
			},
		});
	}

	async getAll(page: number) {
		const totalItems = await prisma.doctorSchedule.count();
		const totalPages = Math.ceil(totalItems / 10);

		const doctorSchedules = await prisma.doctorSchedule.findMany({
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: doctorSchedules, totalPages };
	}
}
