import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { getAllDoctors } from './get-all-doctors';
import { getDoctorSpecialties } from './get-doctor-specialties';
import { getDoctorSchedules } from './get-doctor-schedules';

export async function doctorsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get('/doctors', getAllDoctors);
	app.get('/doctors/:doctorId/specialties', getDoctorSpecialties);
	app.get('/doctors/:doctorId/schedules', getDoctorSchedules);
}
