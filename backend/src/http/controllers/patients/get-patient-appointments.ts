import { AppointmentPatientNotProvidedError } from '@/use-cases/errors/appointment-patient-not-provided-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetPatientAppointmentsUseCase } from '@/use-cases/factories/make-get-patient-appointments-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getPatientAppointments(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const getPatientAppointmentsQuerySchema = z.object({
		patientId: z.string().cuid().optional(),
	});

	const { patientId } = getPatientAppointmentsQuerySchema.parse(req.query);
	const loggedUser = req.user;

	try {
		const getPatientAppointmentsUseCase = makeGetPatientAppointmentsUseCase();

		const patientAppointments = await getPatientAppointmentsUseCase.execute({
			patientId,
			loggedUserId: loggedUser.sub,
			loggedUserRole: loggedUser.roleName,
		});

		return rep.status(200).send(patientAppointments);
	} catch (err) {
		if (err instanceof AppointmentPatientNotProvidedError) {
			return rep.status(400).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}
}
