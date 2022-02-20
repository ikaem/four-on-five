import { PoolQuery } from '../../db';
import { Player } from '../../models/player';

export const getUsers = (query: PoolQuery) => async () => {
	// lets get all users here

	return await Player.getUsers(query);
};
