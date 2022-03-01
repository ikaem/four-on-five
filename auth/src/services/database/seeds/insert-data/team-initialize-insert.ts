import { userRegister } from '../../api/setters/user-register';
import { PoolGetClient } from '../../db';
import { authArgsGenerate } from '../generate-data/auth-args-generate';
import { playerArgsGenerate } from '../generate-data/player-args-generate';

export const teamInitializeInsert = async (getClient: PoolGetClient, rows: number) => {
	// NEXT - STOPPED HERE
	// GET PLAYERS
	// this should get 10 players, and then for those players it should create 10 teams
	// also, player who created the team should be trhe creator - and that is the players role
	// so lets do that creator id thing in player team roles
	// it should probably be team player roles - because team needs to exist for player to have a role in it
	// for (let i = 0; i < rows; i++) {
	// 	console.log('rows', rows);
	// 	const { email, password, authType } = authArgsGenerate();
	// 	const { firstName, lastName, nick, avatarUrl } = playerArgsGenerate();
	// 	await userRegister(getClient)({
	// 		email,
	// 		password,
	// 		authType,
	// 		firstName,
	// 		lastName,
	// 		nick,
	// 		avatarUrl,
	// 	});
	// }
};
