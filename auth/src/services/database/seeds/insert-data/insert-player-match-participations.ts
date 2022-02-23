import { matchesGet } from '../../api/getters/matches-get';
import { playersGet } from '../../api/getters/players-get';
import { playerMatchParticipationCreate } from '../../api/setters/player-match-participation-create';
import { PoolGetClient } from '../../db';
import { generatePlayerMatchParticipationArgs } from '../generate-data/generate-player-match-participation-args';

export const insertPlayerMatchParticipations = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();
	const matches = await matchesGet(getClient)();

	for (const player of players) {
		for (const match of matches) {
			const playerTeamId = Math.random() > 0.5 ? match.team1Id : match.team2Id;

			const playerMatchParticipationArgs = generatePlayerMatchParticipationArgs(
				player.id,
				match.id,
				playerTeamId
			);

			await playerMatchParticipationCreate(getClient)(playerMatchParticipationArgs);
		}
	}
};
