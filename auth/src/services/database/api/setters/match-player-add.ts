import { PoolGetClient } from '../../db';
import { MatchPlayerTeamModel } from '../../models/match-player-team';

interface MatchPlayerAddArgs {
	matchId: number;
	playerId: number;
	teamId: number | null;
}

export const matchPlayerAdd =
	(getClient: PoolGetClient) =>
	async ({ matchId, playerId, teamId }: MatchPlayerAddArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			await MatchPlayerTeamModel.create(
				{
					matchId,
					playerId,
					teamId,
				},
				client
			);

			await client.query('commit');
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
