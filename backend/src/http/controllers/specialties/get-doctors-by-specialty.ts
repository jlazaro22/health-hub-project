import { makeGetDoctorsBySpecialtyUseCase } from '@/use-cases/factories/make-get-doctors-by-specialty-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getDoctorsBySpecialty(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const getDoctorsBySpecialtyParamsSchema = z.object({
		specialtyId: z.string().cuid(),
	});

	const getDoctorsBySpecialtyQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	});

	const { specialtyId } = getDoctorsBySpecialtyParamsSchema.parse(req.params);
	const { page } = getDoctorsBySpecialtyQuerySchema.parse(req.query);

	try {
		const getDoctorsBySpecialtyUseCase = makeGetDoctorsBySpecialtyUseCase();

		const { doctorsBySpecialty, totalPages } =
			await getDoctorsBySpecialtyUseCase.execute({
				specialtyId,
				page,
			});

		return rep.status(200).send({ doctorsBySpecialty, page, totalPages });
	} catch (err) {
		throw err;
	}
}
