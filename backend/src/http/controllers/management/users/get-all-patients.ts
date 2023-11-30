import { makeGetAllPatientsUseCase } from '@/use-cases/factories/make-get-all-patients-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllPatients(req: FastifyRequest, rep: FastifyReply) {
	const getAllPatientsQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllPatientsQuerySchema.parse(req.query);

	try {
		const getAllPatientsUseCase = makeGetAllPatientsUseCase();
		const { patients, totalPages } = await getAllPatientsUseCase.execute({
			page,
		});

		return rep.status(200).send({ patients, page, totalPages });
	} catch (err) {
		throw err;
	}
}
