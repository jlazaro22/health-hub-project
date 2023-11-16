import { Specialty } from '@prisma/client';

interface CreateDoctorsSpecialtyUseCaseRequest {
	name: string;
}

interface CreateDoctorsSpecialtyUseCaseResponse {
	specialty: Specialty;
}
