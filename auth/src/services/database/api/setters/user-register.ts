import { PoolGetClient } from '../../db';
import { AuthModel, AuthModelCreateArgs } from '../../models/auth';
import { PlayerModel, PlayerModelCreateArgs } from '../../models/player';
import { PlayerAuthModel } from '../../models/player-auth';
import { PlayerStatsModel } from '../../models/player-stats';

type UserRegisterArgs = AuthModelCreateArgs & PlayerModelCreateArgs;

export const userRegister =
	(getClient: PoolGetClient) =>
	async ({ email, password, authType, firstName, lastName, nick, avatarUrl }: UserRegisterArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			const auth = await AuthModel.create(
				{
					email,
					password,
					authType,
				},
				client
			);

			const player = await PlayerModel.create(
				{
					firstName,
					lastName,
					nick,
					avatarUrl,
				},
				client
			);

			await PlayerAuthModel.create(
				{
					playerId: player.id,
					authId: auth.id,
				},
				client
			);

			await PlayerStatsModel.create(
				{
					playerId: player.id,
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
