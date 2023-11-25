import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createUser } from './users/create-user';
import { verifyLoggedUserRole } from '@/http/middlewares/verify-logged-user-role';
import { createSpecialty } from './specialties/create-specialty';
import { createMedicine } from './medicines/create-medicine';
import { getAllPatients } from './users/get-all-patients';
import { getAllUsers } from './users/get-all-users';
import { assignDoctorSpecialty } from './doctor-specialties/assign-doctor-specialty';
import { createDoctorSchedule } from './doctor-schedules/create-doctor-schedule';
import { roles } from './roles/roles';

export async function managementRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt);
	app.addHook(
		'onRequest',
		verifyLoggedUserRole(['ADMINISTRADOR', 'COLABORADOR'])
	);

	app.post('/users', createUser);
	app.get('/users', getAllUsers);
	app.get('/users/roles', roles);

	app.post('/doctors/:doctorId/assign-specialty', assignDoctorSpecialty);
	app.post('/doctors/:doctorId/add-schedule', createDoctorSchedule);

	app.post('/specialties', createSpecialty);

	app.get('/patients', getAllPatients);

	// TODO: schedule patient appointment / app.post('/appointments', createAppointment);

	app.post('/create-medicine', createMedicine);
}
