import { PrismaMedicinesRepository } from '@/repositories/prisma/prisma-medicines-repository';
import { SearchMedicinesUseCase } from '../medicines/search-medicines';

export function makeSearchMedicinesUseCase() {
	const medicinesRepository = new PrismaMedicinesRepository();
	const searchMedicinesUseCase = new SearchMedicinesUseCase(
		medicinesRepository
	);

	return searchMedicinesUseCase;
}
