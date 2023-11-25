import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createAppointment } from './create';

export async function appointmentsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.post('/appointments', createAppointment);
}
