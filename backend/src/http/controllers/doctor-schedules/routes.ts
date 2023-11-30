import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { getAllSchedules } from './get-all-schedules';

export async function doctorSchedulesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get('/doctor-schedules', getAllSchedules);
}
