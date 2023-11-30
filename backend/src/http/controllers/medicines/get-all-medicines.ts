import { makeGetAllMedicinesUseCase } from '@/use-cases/factories/make-get-all-medicines-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getAllMedicines(req: FastifyRequest, rep: FastifyReply) {
	const getAllMedicinesQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { page } = getAllMedicinesQuerySchema.parse(req.query);

	try {
		const getAllMedicinesUseCase = makeGetAllMedicinesUseCase();
		const { medicines, totalPages } = await getAllMedicinesUseCase.execute({
			page,
		});

		return rep.status(200).send({ medicines, page, totalPages });
	} catch (err) {
		throw err;
	}
}
