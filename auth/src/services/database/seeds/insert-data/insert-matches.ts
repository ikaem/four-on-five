import { playersGet } from '../../api/getters/players-get';
import { teamsGet } from '../../api/getters/teams-get';
import { teamCreate } from '../../api/setters/team-create';
import { PoolGetClient } from '../../db';
import { generateTeamArgs } from '../generate-data/generate-team-args';

export const insertMatches = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();
	const [team1, team2] = await teamsGet(getClient)({ limit: 2 });

	for (const player of players) {
		await matchCreate(getClient)(generateMatchArgs(player.id, team1.id, team2.id));
	}

	// then when assembled data, do pass it to that signup function
};
