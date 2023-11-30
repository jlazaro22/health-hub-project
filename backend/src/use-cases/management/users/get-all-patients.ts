import { UsersRepository } from '@/repositories/users-repository';
import { Patient } from '@prisma/client';

interface getAllPatientsUseCaseRequest {
	page: number;
}

interface getAllPatientsUseCaseResponse {
	patients: Patient[];
	totalPages: number;
}

export class GetAllPatientsUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		page,
	}: getAllPatientsUseCaseRequest): Promise<getAllPatientsUseCaseResponse> {
		const { data, totalPages } = await this.usersRepository.getAllPatients(
			page
		);

		return { patients: data, totalPages };
	}
}
