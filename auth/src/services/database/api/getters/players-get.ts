import { PoolGetClient } from '../../db';
import { PlayerModel } from '../../models/player';

export const playersGet = (getClient: PoolGetClient) => async () => {
	const client = await getClient();

	try {
		return await PlayerModel.getAll(client);
		// TODO error to be handled in the resolver
	} finally {
		client.release();
	}
};
