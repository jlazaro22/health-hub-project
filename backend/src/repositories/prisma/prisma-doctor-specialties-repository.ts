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

	async findBySpecialtyId(id: string, page: number) {
		const totalItems = await prisma.specialtiesOnDoctors.count({
			where: {
				specialtyId: id,
			},
		});
		const totalPages = Math.ceil(totalItems / 10);

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
			take: 10,
			skip: (page - 1) * 10,
		});

		return { data: doctorsBySpecialty, totalPages };
	}

	async create(data: Prisma.SpecialtiesOnDoctorsUncheckedCreateInput) {
		const doctorSpecialty = await prisma.specialtiesOnDoctors.create({
			data,
		});

		return doctorSpecialty;
	}
}
