import { PoolGetClient } from '../../db';
import { MatchModel, MatchModelCreateArgs } from '../../models/match';
import {
	MatchPlayerRoleModel,
	MatchPlayerRoleModelCreateArgs,
} from '../../models/match-player-role';
import { MatchStatsModel } from '../../models/match-stats';

// TODO this does not get any team info - team data for a match will be called differently

// i guess match id can be passed
// if it exists, it will be added to the match
// if it does not exist, if only name, then we will create one

// TODO more types will be added here eventually
type MatchInitializeArgs = MatchModelCreateArgs & Omit<MatchPlayerRoleModelCreateArgs, 'matchId'>;
// TODO somehow add role for crator - it is some id of a player that needs to be passed in
// what is the return type here? is it something generic, or actually id - i would like to use id

export const matchInitialize =
	(getClient: PoolGetClient) =>
	async ({ matchName, description, matchDate, location, playerId, role }: MatchInitializeArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			const match = await MatchModel.create(
				{
					matchName,
					description,
					matchDate,
					location,
				},
				client
			);

			await MatchStatsModel.create(
				{
					matchId: match.id,
				},
				client
			);

			await MatchPlayerRoleModel.create(
				{
					matchId: match.id,
					playerId,
					role,
				},
				client
			);

			await client.query('commit');

			// there is just id in this match object
			return match;
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
