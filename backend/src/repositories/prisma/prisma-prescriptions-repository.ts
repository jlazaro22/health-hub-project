import { Prisma } from '@prisma/client';
import { PrescriptionsRepository } from '../prescriptions-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPrescriptionsRepository implements PrescriptionsRepository {
	async create(data: Prisma.MedicinesOnAppointmentsUncheckedCreateInput) {
		const prescription = await prisma.medicinesOnAppointments.create({
			data,
		});

		return prescription;
	}
}
