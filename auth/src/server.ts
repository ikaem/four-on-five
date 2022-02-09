import { app } from './app';
import { PORT } from './common';
import { db } from './services';
import { ExecutionEnvironment } from './services/database/config';

// TODO for testing only
import { faker } from '@faker-js/faker';

const start = async () => {
	if (!PORT) throw new Error('No port run Auth service on');
	// TODO check here for env variables needed for db

	// await db(ExecutionEnvironment.DEVELOPMENT).connect().migrateLatest();
	// const data

	db.connectModels();
	console.log('');
	await db.migrateLatest();

	// await addRandomUserOnly();

	app.listen(PORT, () => console.log(`Auth server is listening on port ${PORT}!`));
};

start();

// function
// async function addRandomUserOnly() {
// 	const firstName = faker.name.firstName();
// 	const lastName = faker.name.lastName();

// 	const user = await User.buildUser({ firstName, lastName });
// 	// console.log('user', user.id, 'name', user.first_name);

// 	return user;
// }
