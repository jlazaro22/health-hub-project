import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCreatePrescriptionUseCase } from '@/use-cases/factories/make-create-prescription-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createPrescription(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const createPrescriptionParamsSchema = z.object({
		appointmentNumber: z.coerce.number(),
		appointmentDoctorId: z.string().cuid(),
	});

	const createPrescriptionBodySchema = z.object({
		medicineId: z.string().cuid(),
	});

	const { appointmentNumber, appointmentDoctorId } =
		createPrescriptionParamsSchema.parse(req.params);
	const { medicineId } = createPrescriptionBodySchema.parse(req.body);

	try {
		const createPrescriptionUseCase = makeCreatePrescriptionUseCase();

		await createPrescriptionUseCase.execute({
			appointmentNumber,
			appointmentDoctorId,
			medicineId,
		});
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
