import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

export async function register(req: FastifyRequest, rep: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string().min(6),
		profileId: z.string().optional(),
	});

	const { name, email, password, profileId } = registerBodySchema.parse(
		req.body
	);

	const emailExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (emailExists) {
		return rep.status(409).send();
	}

	const passwordHash = await hash(password, 6);

	if (!profileId) {
		const patientProfile = await prisma.profile.findUnique({
			where: {
				name: 'PACIENTE',
			},
			select: {
				id: true,
			},
		});

		patientProfile &&
			(await prisma.user.create({
				data: {
					name,
					email,
					passwordHash,
					profileId: patientProfile.id,
				},
			}));

		return rep.status(201).send();
	}

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash,
			profileId,
		},
	});

	return rep.status(201).send();
}
