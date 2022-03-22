import { PoolGetClient } from '../../db';
import { MatchModel } from '../../models/match';

// TODO in future, this might get optional ids
export const matchesGetAll = (getClient: PoolGetClient) => async () => {
	const client = await getClient();

	try {
		return await MatchModel.getAll(client);
	} finally {
		client.release();
	}
};
