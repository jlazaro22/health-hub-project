import { Prisma } from '@prisma/client';
import { DoctorSpecialtiesRepository } from '../doctor-specialties-repository';
import { prisma } from '@/lib/prisma';

export class PrismaDoctorSpecialtiesRepository
	implements DoctorSpecialtiesRepository
{
	async findByDoctorId(id: string) {
		const doctorSpecialties = await prisma.specialtiesOnDoctors.findMany({
			include: {
				doctor: {
					select: {
						user: {
							select: {
								name: true,
							},
						},
					},
				},
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

	async findBySpecialtyId(id: string) {
		const doctorsBySpecialty = await prisma.specialtiesOnDoctors.findMany({
			include: {
				doctor: {
					select: {
						user: {
							select: {
								name: true,
							},
						},
					},
				},
				specialty: {
					select: {
						name: true,
						description: true,
					},
				},
			},
			where: {
				specialtyId: id,
			},
		});

		return doctorsBySpecialty;
	}

	async create(data: Prisma.SpecialtiesOnDoctorsUncheckedCreateInput) {
		const doctorSpecialty = await prisma.specialtiesOnDoctors.create({
			data,
		});

		return doctorSpecialty;
	}
}
