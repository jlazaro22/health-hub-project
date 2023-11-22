import { DoctorScheduleAlreadyExistsError } from '@/use-cases/errors/doctor-schedule-already-exists-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCreateDoctorScheduleUseCase } from '@/use-cases/factories/make-create-doctor-schedule-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function createDoctorSchedule(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const createDoctorScheduleParamsSchema = z.object({
		doctorId: z.string().cuid(),
	});

	const createDoctorScheduleBodySchema = z.object({
		date: z.coerce.date(),
		startTime: z.coerce.date(),
		endTime: z.coerce.date(),
		isScheduled: z.boolean().default(false),
	});

	const { doctorId } = createDoctorScheduleParamsSchema.parse(req.params);
	const { date, startTime, endTime, isScheduled } =
		createDoctorScheduleBodySchema.parse(req.body);
	const loggedUserId = req.user.sub;

	try {
		const createDoctorScheduleUseCase = makeCreateDoctorScheduleUseCase();

		await createDoctorScheduleUseCase.execute({
			doctorId,
			date,
			startTime,
			endTime,
			isScheduled,
			updatedBy: loggedUserId,
		});
	} catch (err) {
		if (err instanceof DoctorScheduleAlreadyExistsError) {
			return rep.status(409).send();
		}

		if (err instanceof ResourceNotFoundError) {
			return rep.status(404).send();
		}

		throw err;
	}

	return rep.status(201).send();
}
