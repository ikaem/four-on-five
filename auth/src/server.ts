import { app } from './app';
import { PORT } from './common';

// TODO for testing only
import { faker } from '@faker-js/faker';
import { createGQLServer } from './graphql/create-gql-server';

const start = async () => {
	if (!PORT) throw new Error('No port run Auth service on');

	const gqlServer = await createGQLServer();
	await gqlServer.start();
	// TODO could also probably set the path
	gqlServer.applyMiddleware({ app });

	// TODO could use th actual server here, but stephen girder did it like it it seems - do check!
	app.listen(PORT, () => console.log(`Auth server is listening on port ${PORT}!`));
};

start();
