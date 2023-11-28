import { DoctorScheduleAlreadyTakenError } from '@/use-cases/errors/doctor-schedule-already-taken-error';
import { DoctorScheduleOutdatedError } from '@/use-cases/errors/doctor-schedule-outdated-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeRemoveDoctorScheduleUseCase } from '@/use-cases/factories/make-remove-doctor-schedule-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function removeDoctorSchedule(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const removeDoctorScheduleParamsSchema = z.object({
		doctorId: z.string().cuid(),
		doctorScheduleId: z.string().cuid(),
	});

	const { doctorId, doctorScheduleId } = removeDoctorScheduleParamsSchema.parse(
		req.params
	);

	try {
		const removeDoctorScheduleUseCase = makeRemoveDoctorScheduleUseCase();

		await removeDoctorScheduleUseCase.execute({
			doctorId,
			doctorScheduleId,
		});
	} catch (err) {
		if (
			err instanceof DoctorScheduleAlreadyTakenError ||
			err instanceof DoctorScheduleOutdatedError
		) {
			return rep.status(409).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}

	return rep.status(204).send();
}
