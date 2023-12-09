import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { env } from './env';
import { ZodError } from 'zod';
import { swagger } from './lib/swagger';
import { usersRoutes } from './http/controllers/users/routes';
import { managementRoutes } from './http/controllers/management/routes';
import { appointmentsRoutes } from './http/controllers/appointments/routes';
import { doctorsRoutes } from './http/controllers/doctors/routes';
import { specialtiesRoutes } from './http/controllers/specialties/routes';
import { medicinesRoutes } from './http/controllers/medicines/routes';
import { doctorSchedulesRoutes } from './http/controllers/doctor-schedules/routes';
import { patientsRoutes } from './http/controllers/patients/routes';

export const app = fastify();
app.register(fastifyCors, {});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: { expiresIn: '10m' },
});

app.register(fastifyCookie);

app.ready();
swagger(app);

app.register(usersRoutes);
app.register(managementRoutes, {
	prefix: 'management',
});
app.register(doctorsRoutes);
app.register(specialtiesRoutes);
app.register(doctorSchedulesRoutes);
app.register(patientsRoutes);
app.register(appointmentsRoutes);
app.register(medicinesRoutes);

app.setErrorHandler((err, _, rep) => {
	if (err instanceof ZodError) {
		return rep.status(400).send({
			message: 'Validation error.',
			issues: err.format(),
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(err);
	}

	return rep.status(500).send({ message: 'Internal Server Error' });
});
