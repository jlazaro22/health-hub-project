import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCancelAppointmentUseCase } from '@/use-cases/factories/make-cancel-appointment-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function cancelAppointment(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const cancelAppointmentParamsSchema = z.object({
		appointmentNumber: z.coerce.number(),
		appointmentDoctorId: z.string().cuid(),
	});

	const { appointmentNumber, appointmentDoctorId } =
		cancelAppointmentParamsSchema.parse(req.params);

	try {
		const cancelAppointmentUseCase = makeCancelAppointmentUseCase();

		await cancelAppointmentUseCase.execute({
			appointmentNumber,
			doctorId: appointmentDoctorId,
		});

		return rep.status(204).send();
	} catch (err) {
		if (err instanceof DoctorScheduleOutdatedError) {
			return rep.status(409).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}
}
