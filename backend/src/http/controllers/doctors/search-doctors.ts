import { makeSearchDoctorsUseCase } from '@/use-cases/factories/make-search-doctors-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function searchDoctors(req: FastifyRequest, rep: FastifyReply) {
	const searchDoctorsQuerySchema = z.object({
		query: z.string().default(''),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchDoctorsQuerySchema.parse(req.query);

	try {
		const searchDoctorsUseCase = makeSearchDoctorsUseCase();
		const { doctors, totalPages } = await searchDoctorsUseCase.execute({
			query,
			page,
		});

		return rep.status(200).send({ doctors, page, totalPages });
	} catch (err) {
		throw err;
	}
}
