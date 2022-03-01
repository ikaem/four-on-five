// import { userSignup } from '../../api/setters/user-signup';
// import { PoolGetClient } from '../../db';
// import { generateAuthArgs } from '../generate-data/auth-args-generate';
// import { generatePlayerArgs } from '../generate-data/player-args-generate';

// export const insertUsers = async (getClient: PoolGetClient, rows: number) => {
// 	// TODO loop now to create a user args
// 	for (let i = 0; i < rows; i++) {
// 		const { email, password, authType } = generateAuthArgs();
// 		const { firstName, lastName, nick, avatarUrl } = generatePlayerArgs();

// 		console.log({
// 			email,
// 			password,
// 			authType,
// 			firstName,
// 			lastName,
// 			nick,
// 			avatarUrl,
// 		});

// 		// TODO normally, if we need to pass in the query, we would start the client here, and then we would have to release after we finsih with operation

// 		await userSignup(getClient)({
// 			email,
// 			password,
// 			authType,
// 			firstName,
// 			lastName,
// 			nick,
// 			avatarUrl,
// 		});
// 	}

// 	// then when assembled data, do pass it to that signup function
// };
