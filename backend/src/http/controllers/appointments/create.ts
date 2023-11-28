import { AppointmentPatientNotProvidedError } from '@/use-cases/errors/appointment-patient-not-provided-error';
import { DoctorScheduleAlreadyTakenError } from '@/use-cases/errors/doctor-schedule-already-taken-error';
import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCreateAppointmentUseCase } from '@/use-cases/factories/make-create-appointment-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createAppointment(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const createAppointmentBodySchema = z.object({
		doctorId: z.string().cuid(),
		specialtyId: z.string().cuid(),
		patientId: z.string().cuid().optional(),
		doctorScheduleId: z.string().cuid(),
	});

	const { doctorId, specialtyId, patientId, doctorScheduleId } =
		createAppointmentBodySchema.parse(req.body);
	const loggedUser = req.user;

	try {
		const createAppointmentUseCase = makeCreateAppointmentUseCase();

		await createAppointmentUseCase.execute({
			doctorId,
			specialtyId,
			patientId,
			doctorScheduleId,
			updatedBy: loggedUser.sub,
			loggedUserRole: loggedUser.roleName,
		});
	} catch (err) {
		if (
			err instanceof DoctorScheduleOutdatedError ||
			err instanceof DoctorScheduleAlreadyTakenError
		) {
			return rep.status(409).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		if (err instanceof AppointmentPatientNotProvidedError) {
			return rep.status(400).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
