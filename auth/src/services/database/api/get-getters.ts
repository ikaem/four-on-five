import { PoolQuery, PoolGetClient } from '../db';
import { matchPlayerTeamForMatchesGet } from './getters/match-player-team-for-matches-get';
import { matchesGet } from './getters/matches-get';
import { teamsForMatchesGet } from './getters/teams-for-matches-get';

export type Getters = ReturnType<typeof getGetters>;

export const getGetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	// TODO this prolly not even needed
	matchPlayerTeamForMatchesGet: matchPlayerTeamForMatchesGet(getClient),
	matchesGet: matchesGet(getClient),
	teamsForMatchesGet: teamsForMatchesGet(getClient),
});
