import { PoolQuery, PoolGetClient } from '../db';
import { getUsers } from './getters/get-users';
import { matchPlayerTeamForMatchesGet } from './getters/match-player-team-for-matches-get';

export type Getters = ReturnType<typeof getDbGetters>;

export const getDbGetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	getUsers: getUsers(query),
	// TODO stopped here
	matchPlayerTeamForMatchesGet: matchPlayerTeamForMatchesGet(getClient),
});
