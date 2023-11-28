import { Doctor, Patient, Prisma, Role, User } from '@prisma/client';

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	getRole(name: string): Promise<Role | null>;
	getAllUsers(): Promise<User[] | null>;

	findPatientById(id: string): Promise<Patient | null>;
	findPatientByUserId(id: string): Promise<Patient | null>;
	createPatient(data: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	getAllPatients(): Promise<Patient[] | null>;

	findDoctorById(id: string): Promise<Doctor | null>;
	createDoctor(data: Prisma.DoctorUncheckedCreateInput): Promise<Doctor>;
	getAllDoctors(): Promise<Doctor[] | null>;
}
