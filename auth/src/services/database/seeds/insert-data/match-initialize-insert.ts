import { playersGet } from '../../api/getters/players-get';
import { matchInitialize } from '../../api/setters/match-initialize';
import { PoolGetClient } from '../../db';
import { matchArgsGenerate } from '../generate-data/match-args-generate';
import { matchPlayerRoleArgsGenerate } from '../generate-data/match-player-role-args-generate';

export const matchInitializeInsert = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();

	for (const player of players) {
		const { matchName, description, matchDate, location } = matchArgsGenerate();
		const { role } = matchPlayerRoleArgsGenerate();

		await matchInitialize(getClient)({
			matchName,
			description,
			matchDate,
			location,
			playerId: player.id,
			role,
		});
	}
};
