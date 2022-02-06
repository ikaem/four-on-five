import { app } from './app';
import { PORT } from './common';

const start = async () => {
	if (!PORT) throw new Error('No port run Auth service on');

	app.listen(PORT, () => console.log(`Auth server is listening on port ${PORT }!`));
};

start();
