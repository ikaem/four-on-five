import { PoolGetClient } from '../../db';
import { TeamModel } from '../../models/team';

interface TeamsGetArgs {
	limit: number;
}

export const teamsGet =
	(getClient: PoolGetClient) =>
	async ({ limit }: TeamsGetArgs) => {
		const client = await getClient();

		try {
			return await TeamModel.getAll({ limit }, client);
		} finally {
			client.release();
		}
	};
