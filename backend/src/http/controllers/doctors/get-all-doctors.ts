import { makeGetAllDoctorsUseCase } from '@/use-cases/factories/make-get-all-doctors-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllDoctors(req: FastifyRequest, rep: FastifyReply) {
	const getAllDoctorsQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllDoctorsQuerySchema.parse(req.query);

	try {
		const getAllDoctorsUseCase = makeGetAllDoctorsUseCase();
		const { doctors, totalPages } = await getAllDoctorsUseCase.execute({
			page,
		});

		return rep.status(200).send({ doctors, page, totalPages });
	} catch (err) {
		throw err;
	}
}
