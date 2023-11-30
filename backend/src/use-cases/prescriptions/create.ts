import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { MedicinesRepository } from '@/repositories/medicines-repository';
import { MedicinesOnAppointments } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PrescriptionsRepository } from '@/repositories/prescriptions-repository';

interface CreatePrescriptionUseCaseRequest {
	appointmentNumber: number;
	appointmentDoctorId: string;
	medicineId: string;
}

interface CreatePrescriptionUseCaseResponse {
	prescription: MedicinesOnAppointments;
}

export class CreatePrescriptionUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private medicinesRepository: MedicinesRepository,
		private prescriptionsRepository: PrescriptionsRepository
	) {}

	async execute({
		appointmentNumber,
		appointmentDoctorId,
		medicineId,
	}: CreatePrescriptionUseCaseRequest): Promise<CreatePrescriptionUseCaseResponse> {
		const appointment = await this.appointmentsRepository.findById(
			appointmentNumber,
			appointmentDoctorId
		);

		if (!appointment) {
			throw new ResourceNotFoundError();
		}

		const medicine = await this.medicinesRepository.findById(medicineId);

		if (!medicine) {
			throw new ResourceNotFoundError();
		}

		const prescription = await this.prescriptionsRepository.create({
			appointmentNumber,
			appointmentDoctorId,
			medicineId,
		});

		return { prescription };
	}
}
