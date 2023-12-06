import { AppointmentDoctorNotProvidedError } from '@/use-cases/errors/appointment-doctor-not-provided-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetDoctorAppointmentsUseCase } from '@/use-cases/factories/make-get-doctor-appointments-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getDoctorAppointments(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const getDoctorAppointmentsQuerySchema = z.object({
		doctorId: z.string().cuid().optional(),
	});

	const { doctorId } = getDoctorAppointmentsQuerySchema.parse(req.query);
	const loggedUser = req.user;

	try {
		const getDoctorAppointmentsUseCase = makeGetDoctorAppointmentsUseCase();

		const doctorAppointments = await getDoctorAppointmentsUseCase.execute({
			doctorId,
			loggedUserId: loggedUser.sub,
			loggedUserRole: loggedUser.roleName,
		});

		return rep.status(200).send(doctorAppointments);
	} catch (err) {
		if (err instanceof AppointmentDoctorNotProvidedError) {
			return rep.status(400).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}
}
