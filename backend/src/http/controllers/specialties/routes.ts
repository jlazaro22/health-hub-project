import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { searchSpecialties } from './search-specialties';
import { getDoctorsBySpecialty } from './get-doctors-by-specialty';

export async function specialtiesRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);

	app.get('/specialties', searchSpecialties);
	app.get('/specialties/:specialtyId/doctors', getDoctorsBySpecialty);
}
