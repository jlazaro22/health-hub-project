import { Prisma } from '@prisma/client';
import { AppointmentsRepository } from '../appointments-repository';
import { prisma } from '@/lib/prisma';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
	async findById(number: number, doctorId: string) {
		const appointment = await prisma.appointment.findUnique({
			where: {
				unique_doctor_appointment: {
					appointmentNumber: number,
					doctorId,
				},
			},
		});

		return appointment;
	}

	async findByDoctorId(id: string) {
		const appointments = await prisma.appointment.findMany({
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
				specialty: {
					select: {
						name: true,
					},
				},
				doctorSchedule: {
					select: {
						date: true,
						startTime: true,
						endTime: true,
					},
				},
				patient: {
					select: {
						user: {
							select: {
								name: true,
								email: true,
							},
						},
					},
				},
				medicines: {
					select: {
						medicine: {
							select: {
								name: true,
								description: true,
							},
						},
					},
				},
			},
			where: {
				doctorId: id,
			},
		});

		return appointments;
	}

	async findByPatientId(id: string) {
		const appointments = await prisma.appointment.findMany({
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
				specialty: {
					select: {
						name: true,
					},
				},
				doctorSchedule: {
					select: {
						date: true,
						startTime: true,
						endTime: true,
					},
				},
				patient: {
					select: {
						user: {
							select: {
								name: true,
								email: true,
							},
						},
					},
				},
				medicines: {
					select: {
						medicine: {
							select: {
								name: true,
								description: true,
							},
						},
					},
				},
			},
			where: {
				patientId: id,
			},
		});

		return appointments;
	}

	async countByDoctorId(id: string) {
		const doctorAppointmentsCount = await prisma.appointment.count({
			where: {
				doctorId: id,
			},
		});

		return doctorAppointmentsCount;
	}

	async create(data: Prisma.AppointmentUncheckedCreateInput) {
		const appointment = await prisma.appointment.create({ data });

		return appointment;
	}

	async cancel(number: number, doctorId: string): Promise<void> {
		await prisma.appointment.delete({
			where: {
				unique_doctor_appointment: {
					appointmentNumber: number,
					doctorId,
				},
			},
		});
	}
}
