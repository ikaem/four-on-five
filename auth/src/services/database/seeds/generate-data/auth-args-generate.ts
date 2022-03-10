import faker from '@faker-js/faker';
import { AuthModelCreateArgs } from '../../models/auth';

export const authArgsGenerate = () => {
	const args: AuthModelCreateArgs = {
		email: faker.internet.email(),
		// TODO make this an enum at some point
		authType: 'PASSWORD',
		password: 'PASSWORD',
	};

	return args;
};
