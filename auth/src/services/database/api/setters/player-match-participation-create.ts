import { PoolGetClient } from '../../db';
import {
	CreatePlayerMatchParticipationArgs,
	PlayerMatchParticipation,
} from '../../models/player-match-participation';

export const playerMatchParticipationCreate =
	(getClient: PoolGetClient) =>
	async ({ playerId, matchId, teamId }: CreatePlayerMatchParticipationArgs) => {
		const client = await getClient();

		try {
			return await PlayerMatchParticipation.createPlayerMatchParticipation(
				{ playerId, matchId, teamId },
				client
			);
		} finally {
			client.release();
		}
	};
