import { makeAssignDoctorSpecialtyUseCase } from '@/use-cases/factories/make-assign-doctor-specialty-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function assignDoctorSpecialty(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const assignDoctorSpecialtyParamsSchema = z.object({
		doctorId: z.string().cuid(),
	});

	const assignDoctorSpecialtyBodySchema = z.object({
		specialtyId: z.string(),
	});

	const { doctorId } = assignDoctorSpecialtyParamsSchema.parse(req.params);
	const { specialtyId } = assignDoctorSpecialtyBodySchema.parse(req.body);

	const assignDoctorSpecialtyUseCase = makeAssignDoctorSpecialtyUseCase();

	await assignDoctorSpecialtyUseCase.execute({
		doctorId,
		specialtyId,
	});

	return rep.status(201).send();
}
