import faker from '@faker-js/faker';
import { CreateTeamArgs } from '../../models/team';

export const generateTeamArgs = (creatorId: number) => {
	const args: CreateTeamArgs = {
		creatorId,
		teamName: faker.company.companyName(),
	};

	return args;
};
