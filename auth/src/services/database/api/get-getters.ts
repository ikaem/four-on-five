import { PoolQuery, PoolGetClient } from '../db';
import { matchPlayerTeamForMatchesGet } from './getters/match-player-team-for-matches-get';
import { matchesGet } from './getters/matches-get';

export type Getters = ReturnType<typeof getGetters>;

export const getGetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	matchPlayerTeamForMatchesGet: matchPlayerTeamForMatchesGet(getClient),
	matchesGet: matchesGet(getClient),
});
