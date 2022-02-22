import { PoolGetClient } from '../../db';
import { Match } from '../../models/match';

// TODO in future, this might get optional ids
export const matchesGet = (getClient: PoolGetClient) => async () => {
	const client = await getClient();

	try {
		return await Match.getMatches(client);
	} finally {
		client.release();
	}
};
