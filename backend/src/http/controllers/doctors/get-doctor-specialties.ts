import { makeGetDoctorSpecialtiesUseCase } from '@/use-cases/factories/make-get-doctor-specialties-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function getDoctorSpecialties(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const assignDoctorSpecialtyParamsSchema = z.object({
		doctorId: z.string().cuid(),
	});

	const { doctorId } = assignDoctorSpecialtyParamsSchema.parse(req.params);

	try {
		const getDoctorSpecialtiesUseCase = makeGetDoctorSpecialtiesUseCase();

		const doctorSpecialties = await getDoctorSpecialtiesUseCase.execute({
			doctorId,
		});

		return rep.status(200).send(doctorSpecialties);
	} catch (err) {
		throw err;
	}
}
