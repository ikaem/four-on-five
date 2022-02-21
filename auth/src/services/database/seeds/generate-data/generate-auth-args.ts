import faker from '@faker-js/faker';
import { CreateAuthArgs } from '../../models/auth';

export const generateAuthArgs = () => {
	const args: CreateAuthArgs = {
		email: faker.internet.email(),
		// TODO make this an enum at some point
		authType: 'PASSWORD',
		password: 'PASSWORD',
	};

	return args;
};
