import { Appointment, Prisma } from '@prisma/client';

export interface AppointmentsRepository {
	findByDoctorId(id: string): Promise<Appointment[] | null>;
	findByPatientId(id: string): Promise<Appointment[] | null>;
	create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
	countByDoctorId(id: string): Promise<number>;
}
