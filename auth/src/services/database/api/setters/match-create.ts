import { PoolGetClient } from '../../db';
import { CreateMatchArgs, Match } from '../../models/match';
import { MatchStats } from '../../models/match-stats';

interface MatchCreateAttributes {
	matchId: number;
	// TODO not sure what exactly will be returned here
}

// TODO this is to include the optional score as well that might have been doen already
export interface MatchCreateArgs extends CreateMatchArgs {
	team1Score: number | null;
	team2Score: number | null;
}

// TODO this is actually creating entire match, together with its own match stats
export const matchCreate =
	(getClient: PoolGetClient) =>
	async ({
		organizerId,
		team1Id,
		team2Id,
		matchName,
		description,
		matchDate,
		location,
		team1Score = null,
		team2Score = null,
	}: MatchCreateArgs): Promise<MatchCreateAttributes> => {
		const client = await getClient();

		// TODO stopped here

		try {
			await client.query('begin');

			const match = await Match.createMatch(
				{
					organizerId,
					team1Id,
					team2Id,
					matchName,
					description,
					matchDate,
					location,
				},
				client
			);

			await MatchStats.createMatchStats(
				{
					matchId: match.id,
					team1Score,
					team2Score,
				},
				client
			);

			await client.query('commit');

			return {
				matchId: match.id,
			};

			// TODO curious if error will be rethrown witjhout catch
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
