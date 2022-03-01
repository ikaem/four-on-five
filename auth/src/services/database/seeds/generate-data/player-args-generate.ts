import faker from '@faker-js/faker';
import { PlayerModelCreateArgs } from '../../models/player';

export const playerArgsGenerate = () => {
	const args: PlayerModelCreateArgs = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		nick: faker.name.jobDescriptor(),
		avatarUrl: '',
	};

	return args;
};
