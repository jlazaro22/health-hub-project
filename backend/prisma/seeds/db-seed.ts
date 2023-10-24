import { Prisma, PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seeder() {
	const profileNames: string[] = ['ADMIN', 'EMPLOYEE', 'DOCTOR', 'PATIENT'];

	await Promise.all(
		profileNames.map(async (name) => {
			await prisma.profile.create({
				data: {
					name,
				},
			});
		})
	);

	const adminProfile = await prisma.profile.findUnique({
		where: {
			name: 'ADMIN',
		},
		select: {
			id: true,
		},
	});

	if (!adminProfile) {
		console.error('⚠️ No admin profile in database');
		throw new Error('No admin profile in database');
	}

	function fakeRandomUser() {
		return {
			name: `${faker.person.firstName()} ${faker.person.lastName()}`,
			email: faker.internet.email(),
			passwordHash: '123456',
			profileId: adminProfile.id,
		};
	}

	const fakeUsers = faker.helpers.multiple(fakeRandomUser, {
		count: 4,
	});

	fakeUsers.forEach(async (user) => {
		await prisma.user.create({
			data: user,
		});
	});
}

seeder()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
