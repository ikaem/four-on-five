import { playersGet } from '../../api/getters/players-get';
import { teamCreate } from '../../api/setters/team-create';
import { PoolGetClient } from '../../db';
import { generateTeamArgs } from '../generate-data/generate-team-args';

export const insertTeams = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();

	for (const player of players) {
		await teamCreate(getClient)(generateTeamArgs(player.id));
	}

	// then when assembled data, do pass it to that signup function
};
