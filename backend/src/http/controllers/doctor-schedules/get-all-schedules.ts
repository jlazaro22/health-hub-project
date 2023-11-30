import { makeGetAllSchedulesUseCase } from '@/use-cases/factories/make-get-all-doctor-schedules-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllSchedules(req: FastifyRequest, rep: FastifyReply) {
	const getAllSchedulesQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllSchedulesQuerySchema.parse(req.query);

	try {
		const getAllSchedulesUseCase = makeGetAllSchedulesUseCase();
		const { doctorSchedules, totalPages } =
			await getAllSchedulesUseCase.execute({
				page,
			});

		return rep.status(200).send({ doctorSchedules, page, totalPages });
	} catch (err) {
		throw err;
	}
}
