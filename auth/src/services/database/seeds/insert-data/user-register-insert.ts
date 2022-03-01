import { userRegister } from '../../api/setters/user-register';
import { PoolGetClient } from '../../db';
import { authArgsGenerate } from '../generate-data/auth-args-generate';
import { playerArgsGenerate } from '../generate-data/player-args-generate';

export const userRegisterInsert = async (getClient: PoolGetClient, rows: number) => {
	for (let i = 0; i < rows; i++) {
		console.log('rows', rows);
		const { email, password, authType } = authArgsGenerate();
		const { firstName, lastName, nick, avatarUrl } = playerArgsGenerate();

		await userRegister(getClient)({
			email,
			password,
			authType,
			firstName,
			lastName,
			nick,
			avatarUrl,
		});
	}
};
