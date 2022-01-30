import { app } from './app';
import { PORT } from './common';

console.log('env', process.env.NODE_ENV);
const me = '3';

const start = async () => {
	const test = 3;
	if (!PORT) throw new Error('No port run Auth service on');

	app.listen(PORT, () => console.log(`Auth server is listening on port ${PORT}`));
};

start();
