import { PoolGetClient } from '../../db';
import { Player, PlayerAttributes } from '../../models/player';

export const playersGet = (getClient: PoolGetClient) => async (): Promise<PlayerAttributes[]> => {
	const client = await getClient();

	try {
		return await Player.getPlayers(client);
	} finally {
		client.release();
	}
};
