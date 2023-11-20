import { $Enums, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({
			include: {
				role: {
					select: {
						name: true,
					},
				},
			},
			where: {
				id,
			},
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = await prisma.user.create({ data });

		return user;
	}

	async createPatient(data: Prisma.PatientUncheckedCreateInput) {
		const patient = await prisma.patient.create({ data });

		return patient;
	}

	async getAllDoctors() {
		const doctors = await prisma.doctor.findMany({
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		});

		return doctors;
	}

	async createDoctor(data: Prisma.DoctorUncheckedCreateInput) {
		const doctor = await prisma.doctor.create({ data });

		return doctor;
	}

	async getRole(name: string) {
		name = name.trim().toUpperCase();

		const role = await prisma.role.findUnique({
			where: {
				name,
			},
		});

		return role;
	}
}
