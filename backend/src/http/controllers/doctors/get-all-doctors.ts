import { makeGetAllDoctorsUseCase } from '@/use-cases/factories/make-get-all-doctors-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllDoctors(req: FastifyRequest, rep: FastifyReply) {
	try {
		const getAllDoctorsUseCase = makeGetAllDoctorsUseCase();
		const doctors = await getAllDoctorsUseCase.execute();

		return rep.status(200).send(doctors);
	} catch (err) {
		throw err;
	}
}
