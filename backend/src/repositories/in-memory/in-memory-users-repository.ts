import { $Enums, Doctor, Patient, Prisma, Role, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	public users: User[] = [];
	public roles: Role[] = [];
	public patients: Patient[] = [];
	public doctors: Doctor[] = [];

	constructor() {
		const roleNames: string[] = [
			'ADMINISTRADOR',
			'COLABORADOR',
			'MEDICO',
			'PACIENTE',
		];

		roleNames.map((name) => {
			let role = {
				id: randomUUID(),
				name,
			};

			this.roles.push(role);
		});
	}

	async findById(id: string) {
		const user = this.users.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			createdAt: new Date(),
			updatedAt: new Date(),
			roleId: data.roleId,
		};

		this.users.push(user);

		return user;
	}

	async searchManyUsers(query: string, page: number) {
		const totalItems = this.users.length;
		const totalPages = Math.ceil(totalItems / 10);

		return { data: this.users, totalPages };
	}

	async findPatientById(id: string) {
		const patient = this.patients.find((item) => item.id === id);

		if (!patient) {
			return null;
		}

		return patient;
	}

	async findPatientByUserId(id: string) {
		const patient = this.patients.find((item) => item.userId === id);

		if (!patient) {
			return null;
		}

		return patient;
	}

	async createPatient(data: Prisma.PatientUncheckedCreateInput) {
		const patient = {
			id: randomUUID(),
			gender: data.gender,
			birthDate: new Date(data.birthDate),
			userId: data.userId,
			address: data.address as string | null,
			phone: data.phone as string | null,
			insuranceProvider: data.insuranceProvider as string | null,
			insurancePolicyNumber: data.insurancePolicyNumber as string | null,
		};

		this.patients.push(patient);

		return patient;
	}

	async searchManyPatients(query: string, page: number) {
		const totalItems = this.patients.length;
		const totalPages = Math.ceil(totalItems / 10);

		return { data: this.patients, totalPages };
	}

	async findDoctorById(id: string) {
		const doctor = this.doctors.find((item) => item.id === id);

		if (!doctor) {
			return null;
		}

		return doctor;
	}

	async createDoctor(data: Prisma.DoctorUncheckedCreateInput) {
		const doctor = {
			id: randomUUID(),
			userId: data.userId,
			gender: data.gender,
			photoUrl: data.photoUrl as string | null,
			birthDate: data.birthDate as Date | null,
			phone: data.phone as string | null,
			licenseNumber: data.licenseNumber,
			licenseExpiryDate: new Date(data.licenseExpiryDate),
		};

		this.doctors.push(doctor);

		return doctor;
	}

	async searchManyDoctors(query: string, page: number) {
		const totalItems = this.doctors.length;
		const totalPages = Math.ceil(totalItems / 10);

		return { data: this.doctors, totalPages };
	}

	async getRole(name: string) {
		name = name.trim().toUpperCase();

		const role = this.roles.find((item) => item.name === name);

		if (!role) {
			return null;
		}

		return role;
	}
}
