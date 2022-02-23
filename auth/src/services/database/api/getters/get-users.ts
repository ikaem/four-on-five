import { PoolQuery } from '../../db';
import { Player } from '../../models/player';

// TODO this is not even needed
export const getUsers = (query: PoolQuery) => async () => {
	// lets get all users here

	return await Player.getUsers(query);
};
