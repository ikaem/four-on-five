import { PoolGetClient } from '../../db';
import { MatchPlayerModel } from '../../models/match-player';

interface MatchPlayerAddArgs {
	matchId: number;
	playerId: number;
	matchTeamId: number | null;
}

export const matchPlayerAdd =
	(getClient: PoolGetClient) =>
	async ({ matchId, playerId, matchTeamId }: MatchPlayerAddArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			await MatchPlayerModel.create(
				{
					matchId,
					playerId,
					matchTeamId,
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
