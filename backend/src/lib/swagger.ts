import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function swagger(app: FastifyInstance) {
	await app.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'HealthHub API Documentation',
				description: 'Medical clinic management application',
				version: '1.0.0',
			},
			// host: '127.0.0.1:3333',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		},
	});

	await app.register(fastifySwaggerUi, {
		// routePrefix: '/documentation',
		uiConfig: {
			docExpansion: 'list',
			deepLinking: false,
			defaultModelRendering: 'model',
			defaultModelExpandDepth: 10,
		},
		uiHooks: {
			onRequest: function (request, reply, next) {
				next();
			},
			preHandler: function (request, reply, next) {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});
}
