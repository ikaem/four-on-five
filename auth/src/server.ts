import { app } from './app';
import { PORT } from './common';
import { db } from './services';
import { ExecutionEnvironment } from './services/database/config';

// TODO for testing only
import { faker } from '@faker-js/faker';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { gqlServer } from './graphql/server';

const start = async () => {
	if (!PORT) throw new Error('No port run Auth service on');

	// here call the pg api wapper
	// TODO check here for env variables needed for db

	// await db(ExecutionEnvironment.DEVELOPMENT).connect().migrateLatest();
	// const data

	// db.connectModels();
	// console.log('');
	await db.migrateLatest();

	// await addRandomUserOnly();

	await gqlServer.start();
	// TODO could also probably set the path
	gqlServer.applyMiddleware({ app });

	// TODO could use th actual server here, but stephen girder did it like it it seems - do check!
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
