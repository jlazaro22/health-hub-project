import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './users/create-user';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { createSpecialty } from './specialties/create-specialty';
import { createMedicine } from './medicines/create-medicine';
import { getAllDoctors } from './users/get-all-doctors';
import { getAllPatients } from './users/get-all-patients';
import { getAllUsers } from './users/get-all-users';
import { assignDoctorSpecialty } from './doctor-specialties/assign-doctor-specialty';
import { getAllSpecialties } from './specialties/get-all-specialties';

export async function managementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);
	app.addHook(
		'onRequest',
		verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])
	);

	app.post('/create-user', createUser);
	app.get('/users', getAllUsers);

	app.get('/doctors', getAllDoctors);
	app.post('/doctors/:doctorId/doctor-specialties', assignDoctorSpecialty);

	app.get('/patients', getAllPatients);

	app.post('/create-specialty', createSpecialty);
	app.get('/specialties', getAllSpecialties);

	app.post('/create-medicine', createMedicine);
}
