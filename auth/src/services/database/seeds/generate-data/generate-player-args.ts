import faker from '@faker-js/faker';
import { CreatePlayerArgs } from '../../models/player';

export const generatePlayerArgs = () => {
	// TODO rename this to CreatePlayerArgs
	const args: Omit<CreatePlayerArgs, 'authId'> = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		nick: faker.name.jobDescriptor(),
		avatarUrl: '',
	};

	return args;
};
