import faker from '@faker-js/faker';
import { CreateMatchArgs } from '../../models/match';

export const generateMatchArgs = (organizerId: number, team1Id: number, team2Id: number) => {
	const args: CreateMatchArgs = {
		organizerId,
		team1Id,
		team2Id,
		matchName: faker.commerce.product(),
		description: faker.lorem.paragraph(3),
		matchDate: new Date().toISOString(),
		location: JSON.stringify({
			latitude: faker.address.latitude(),
			longitude: faker.address.longitude(),
		}),
	};

	return args;
};
