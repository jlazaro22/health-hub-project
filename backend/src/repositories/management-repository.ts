import { Prisma, Specialty } from '@prisma/client';

export interface ManagementRepository {
	createDoctorsSpecialty(data: Prisma.SpecialtyCreateInput): Promise<Specialty>;
}
