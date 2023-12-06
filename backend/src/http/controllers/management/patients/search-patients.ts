import { makeSearchPatientsUseCase } from '@/use-cases/factories/make-search-patients-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function searchPatients(req: FastifyRequest, rep: FastifyReply) {
	const searchPatientsQuerySchema = z.object({
		query: z.string().default(''),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchPatientsQuerySchema.parse(req.query);

	try {
		const searchPatientsUseCase = makeSearchPatientsUseCase();
		const { patients, totalPages } = await searchPatientsUseCase.execute({
			query,
			page,
		});

		return rep.status(200).send({ patients, page, totalPages });
	} catch (err) {
		throw err;
	}
}
