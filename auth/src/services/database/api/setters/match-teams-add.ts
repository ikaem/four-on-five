import { PoolGetClient } from '../../db';
import { MatchTeamModel } from '../../models/match-team';

interface MatchTeamsAddArgs {
	matchId: number;
	teamIds: number[];
}

export const matchTeamsAdd =
	(getClient: PoolGetClient) =>
	async ({ matchId, teamIds }: MatchTeamsAddArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			for (const teamId of teamIds) {
				// not sure still what should this return
				await MatchTeamModel.create(
					{
						matchId,
						teamId,
					},
					client
				);
			}

			await client.query('commit');
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
