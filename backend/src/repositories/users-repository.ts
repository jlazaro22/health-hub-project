import { Doctor, Patient, Prisma, Role, User } from '@prisma/client';

interface Paginable<T> {
	data: T[];
	totalPages: number;
}

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	getRole(name: string): Promise<Role | null>;
	getAllUsers(page: number): Promise<Paginable<User>>;

	findPatientById(id: string): Promise<Patient | null>;
	findPatientByUserId(id: string): Promise<Patient | null>;
	createPatient(data: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	getAllPatients(page: number): Promise<Paginable<Patient>>;

	findDoctorById(id: string): Promise<Doctor | null>;
	createDoctor(data: Prisma.DoctorUncheckedCreateInput): Promise<Doctor>;
	getAllDoctors(page: number): Promise<Paginable<Doctor>>;
}
