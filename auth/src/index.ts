import { app } from './app';
import { PORT } from './common';
import { db } from './services';
import { ExecutionEnvironment } from './services/database/config';

const start = async () => {
	if (!PORT) throw new Error('No port run Auth service on');
	// TODO check here for env variables needed for db

	db(ExecutionEnvironment.DEVELOPMENT).connect();

	app.listen(PORT, () => console.log(`Auth server is listening on port ${PORT}!`));
};

start();
