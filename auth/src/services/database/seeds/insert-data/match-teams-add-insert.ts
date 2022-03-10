import { matchesGet } from '../../api/getters/matches-get';
import { teamsGet } from '../../api/getters/teams-get';
import { matchTeamAdd } from '../../api/setters/match-team-add';
import { PoolGetClient } from '../../db';

export const matchTeamsAddInsert = async (getClient: PoolGetClient) => {
	const matches = await matchesGet(getClient)();
	const [team1, team2] = await teamsGet(getClient)({ limit: 2 });

	for (const match of matches) {
		await matchTeamAdd(getClient)({ matchId: match.id, teamId: team1.id });
		await matchTeamAdd(getClient)({ matchId: match.id, teamId: team2.id });
	}
};
