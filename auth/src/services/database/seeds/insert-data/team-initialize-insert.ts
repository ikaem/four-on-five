import { playersGet } from '../../api/getters/players-get';
import { teamInitialize } from '../../api/setters/team-initialize';
import { PoolGetClient } from '../../db';
import { teamArgsGenerate } from '../generate-data/team-args-generate';
import { teamPlayerRoleArgsGenerate } from '../generate-data/team-player-role-args-generate';

export const teamInitializeInsert = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();

	for (const player of players) {
		const { teamName } = teamArgsGenerate();
		const { role } = teamPlayerRoleArgsGenerate();

		await teamInitialize(getClient)({ teamName, playerId: player.id, role });
	}
};
