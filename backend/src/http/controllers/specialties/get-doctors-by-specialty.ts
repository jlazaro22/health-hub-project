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

	const { specialtyId } = getDoctorsBySpecialtyParamsSchema.parse(req.params);

	try {
		const getDoctorsBySpecialtyUseCase = makeGetDoctorsBySpecialtyUseCase();

		const doctorsBySpecialty = await getDoctorsBySpecialtyUseCase.execute({
			specialtyId,
		});

		return rep.status(200).send(doctorsBySpecialty);
	} catch (err) {
		throw err;
	}
}
