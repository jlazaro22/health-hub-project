import { makeGetAllPatientsUseCase } from '@/use-cases/factories/make-get-all-patients-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllPatients(req: FastifyRequest, rep: FastifyReply) {
	try {
		const getAllPatientsUseCase = makeGetAllPatientsUseCase();
		const patients = await getAllPatientsUseCase.execute();

		return rep.status(200).send(patients);
	} catch (err) {
		throw err;
	}
}
