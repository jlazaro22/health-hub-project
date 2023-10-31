import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export const app = fastify();

const prisma = new PrismaClient();

app.get('/users', (req, rep) => {
	return rep.status(200).send('users');
});
