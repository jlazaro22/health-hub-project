import { Prisma } from '@prisma/client';
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

	async getAllUsers(page: number) {
		const totalItems = await prisma.user.count();
		const totalPages = Math.ceil(totalItems / 10);

		const users = await prisma.user.findMany({
			include: {
				role: {
					select: {
						name: true,
					},
				},
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: users, totalPages };
	}

	async findPatientById(id: string) {
		const patient = await prisma.patient.findUnique({
			where: {
				id,
			},
		});

		return patient;
	}

	async findPatientByUserId(id: string) {
		const patient = await prisma.patient.findUnique({
			where: {
				userId: id,
			},
		});

		return patient;
	}

	async createPatient(data: Prisma.PatientUncheckedCreateInput) {
		const patient = await prisma.patient.create({ data });

		return patient;
	}

	async getAllPatients(page: number) {
		const totalItems = await prisma.patient.count();
		const totalPages = Math.ceil(totalItems / 10);

		const patients = await prisma.patient.findMany({
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: patients, totalPages };
	}

	async findDoctorById(id: string) {
		const doctor = await prisma.doctor.findUnique({
			where: {
				id,
			},
		});

		return doctor;
	}

	async createDoctor(data: Prisma.DoctorUncheckedCreateInput) {
		const doctor = await prisma.doctor.create({ data });

		return doctor;
	}

	async getAllDoctors(page: number) {
		const totalItems = await prisma.doctor.count();
		const totalPages = Math.ceil(totalItems / 10);

		const doctors = await prisma.doctor.findMany({
			include: {
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: doctors, totalPages };
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
