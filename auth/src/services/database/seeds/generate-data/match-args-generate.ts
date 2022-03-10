import faker from '@faker-js/faker';
import { MatchModelCreateArgs } from '../../models/match';

export const matchArgsGenerate = () => {
	const args: MatchModelCreateArgs = {
		matchName: faker.commerce.productName(),
		description: faker.lorem.sentences(),
		matchDate: new Date().toISOString(),
		location: JSON.stringify({
			latitude: faker.address.latitude(),
			longitude: faker.address.longitude(),
		}),
	};

	return args;
};
