import { Prisma } from '@prisma/client';
import { DoctorSpecialtiesRepository } from '../doctor-specialties-repository';
import { prisma } from '@/lib/prisma';

export class PrismaDoctorSpecialtiesRepository
	implements DoctorSpecialtiesRepository
{
	async findByDoctorId(id: string) {
		const doctorSpecialties = await prisma.specialtiesOnDoctors.findMany({
			include: {
				specialty: {
					select: {
						name: true,
						description: true,
					},
				},
			},
			where: {
				doctorId: id,
			},
		});

		return doctorSpecialties;
	}

	async create(data: Prisma.SpecialtiesOnDoctorsUncheckedCreateInput) {
		const doctorSpecialty = await prisma.specialtiesOnDoctors.create({
			data,
		});

		return doctorSpecialty;
	}
}
