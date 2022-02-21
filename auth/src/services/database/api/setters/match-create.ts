import { PoolGetClient } from '../../db';
import { MatchAttributes, MatchCreateArgs } from '../../models/match';

export const matchCreate =
	(getClient: PoolGetClient) =>
	async ({}: MatchCreateArgs): Promise<MatchAttributes> => {
		const client = await getClient();

		// TODO stopped here

		try {
			return await Team.createTeam(
				{
					creatorId,
					teamName,
				},
				client
			);

			// TODO curious if error will be rethrown witjhout catch
		} finally {
			client.release();
		}
	};
