import faker from '@faker-js/faker';
import { TeamModelCreateArgs } from '../../models/team';

export const teamArgsGenerate = () => {
	const args: TeamModelCreateArgs = {
		teamName: faker.commerce.productName(),
	};

	return args;
};
