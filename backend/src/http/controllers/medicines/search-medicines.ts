import { makeSearchMedicinesUseCase } from '@/use-cases/factories/make-search-medicines-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function searchMedicines(req: FastifyRequest, rep: FastifyReply) {
	const searchMedicinesQuerySchema = z.object({
		query: z.string().default(''),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchMedicinesQuerySchema.parse(req.query);

	try {
		const searchMedicinesUseCase = makeSearchMedicinesUseCase();
		const { medicines, totalPages } = await searchMedicinesUseCase.execute({
			query,
			page,
		});

		return rep.status(200).send({ medicines, page, totalPages });
	} catch (err) {
		throw err;
	}
}
