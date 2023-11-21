import { makeGetAllSpecialtiesUseCase } from '@/use-cases/factories/make-get-all-specialties-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllSpecialties(
	req: FastifyRequest,
	rep: FastifyReply
) {
	try {
		const getAllSpecialtiesUseCase = makeGetAllSpecialtiesUseCase();
		const specialties = await getAllSpecialtiesUseCase.execute();

		return rep.status(200).send(specialties);
	} catch (err) {
		throw err;
	}
}
