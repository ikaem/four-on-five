import { PoolGetClient } from '../../db';
import { MatchTeamModel } from '../../models/match-team';

interface MatchTeamAddArgs {
	matchId: number;
	teamId: number;
}

export const matchTeamAdd =
	(getClient: PoolGetClient) =>
	async ({ matchId, teamId }: MatchTeamAddArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			await MatchTeamModel.create(
				{
					matchId,
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
