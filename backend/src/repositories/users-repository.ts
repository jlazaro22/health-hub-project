import { Doctor, Patient, Prisma, Role, User } from '@prisma/client';

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	createPatient(data: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	createDoctor(data: Prisma.DoctorUncheckedCreateInput): Promise<Doctor>;
	getRole(name: string): Promise<Role | null>;
}
