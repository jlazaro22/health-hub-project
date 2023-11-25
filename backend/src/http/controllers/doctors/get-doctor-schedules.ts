import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetDoctorSchedulesUseCase } from '@/use-cases/factories/make-get-doctor-schedules-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getDoctorSchedules(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const getDoctorSchedulesParamsSchema = z.object({
		doctorId: z.string().cuid(),
	});

	const { doctorId } = getDoctorSchedulesParamsSchema.parse(req.params);

	try {
		const getDoctorSchedulesUseCase = makeGetDoctorSchedulesUseCase();

		const doctorSchedules = await getDoctorSchedulesUseCase.execute({
			doctorId,
		});

		return rep.status(200).send(doctorSchedules);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}
}
