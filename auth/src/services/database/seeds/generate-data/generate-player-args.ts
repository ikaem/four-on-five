import faker from '@faker-js/faker';
import { PlayerCreateArgs } from '../../models/player';

export const generatePlayerArgs = () => {
	const args: Omit<PlayerCreateArgs, 'authId'> = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		nick: faker.name.jobDescriptor(),
		avatarUrl: '',
	};

	return args;
};
