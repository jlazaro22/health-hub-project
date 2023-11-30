import { MedicineAlreadyExistsError } from '@/use-cases/errors/medicine-already-exists-error';
import { makeCreateMedicineUseCase } from '@/use-cases/factories/make-create-medicine-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createMedicine(req: FastifyRequest, rep: FastifyReply) {
	const createMedicineBodySchema = z.object({
		name: z.string(),
		description: z.string().optional(),
	});

	const { name, description } = createMedicineBodySchema.parse(req.body);

	try {
		const createMedicineUseCase = makeCreateMedicineUseCase();
		await createMedicineUseCase.execute({
			name,
			description,
		});
	} catch (err) {
		if (err instanceof MedicineAlreadyExistsError) {
			return rep.status(409).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
