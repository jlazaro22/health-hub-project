import { Appointment, Prisma } from '@prisma/client';

export interface AppointmentsRepository {
	findById(number: number, doctorId: string): Promise<Appointment | null>;
	findByDoctorId(id: string): Promise<Appointment[] | null>;
	findByPatientId(id: string): Promise<Appointment[] | null>;
	create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
	cancel(number: number, doctorId: string): Promise<void>;
	countByDoctorId(id: string): Promise<number>;
}
