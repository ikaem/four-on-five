import { PoolGetClient } from '../../db';
import { Auth, AuthCreateArgs } from '../../models/auth';
import { Player, PlayerCreateArgs } from '../../models/player';

export type UserSignupArgs = AuthCreateArgs & Omit<PlayerCreateArgs, 'authId'>;
interface UserSignupAttributes {
	// TODO not sure what to return here, or how this interface should be called
	authId: number;
}

export const userSignup =
	(getClient: PoolGetClient) =>
	async ({
		email,
		password,
		authType,
		firstName,
		lastName,
		nick,
		avatarUrl,
	}: UserSignupArgs): Promise<UserSignupAttributes> => {
		const client = await getClient();

		try {
			await client.query('begin');
			const auth = await Auth.createAuth(
				{
					email,
					password,
					authType,
				},
				client
			);

			await Player.createPlayer(
				{
					authId: auth.id,
					firstName,
					lastName,
					nick,
					avatarUrl,
				},
				// client.query
				client
			);

			await client.query('commit');

			return {
				authId: auth.id,
			};
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
