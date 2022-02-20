import faker from '@faker-js/faker';
import { AuthCreateArgs } from '../../models/auth';

export const generateAuthArgs = () => {
	const args: AuthCreateArgs = {
		email: faker.internet.email(),
		// TODO make this an enum at some point
		authType: 'PASSWORD',
		password: 'PASSWORD',
	};

	return args;
};
