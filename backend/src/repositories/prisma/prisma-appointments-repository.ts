import { Prisma } from '@prisma/client';
import { AppointmentsRepository } from '../appointments-repository';
import { prisma } from '@/lib/prisma';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
	async findById(number: number, doctorId: string) {
		const appointment = await prisma.appointment.findFirst({
			where: {
				appointmentNumber: number,
				doctorId,
			},
		});

		return appointment;
	}

	async findByDoctorId(id: string) {
		const appointments = await prisma.appointment.findMany({
			where: {
				doctorId: id,
			},
		});

		return appointments;
	}

	async findByPatientId(id: string) {
		const appointments = await prisma.appointment.findMany({
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
}
