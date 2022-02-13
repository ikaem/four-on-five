import { Pool, PoolClient, Submittable } from 'pg';
import { db } from '..';
import { UserAuth } from '../../../graphql/schema/type-defs/types/user-auth-type';
import { PoolQuery, PoolGetClient } from '../db';
import { Auth, AuthType } from '../models/auth';
import { User } from '../models/user';
import { UserTest } from '../models/user-test';
import { userSignup } from './setters/user-signup';

// export type Setters = typeof setters;
export type Setters = ReturnType<typeof getSetters>;

// const { dbInstance } = db;

/*  */

export const getSetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	userSignup: userSignup(getClient),

	// userSignup: async ({
	// 	firstName,
	// 	lastName,
	// 	email,
	// 	password,
	// 	authType,
	// }: UserSignupArgs): Promise<UserAuth> => {
	// 	const client = await getClient();
	// 	try {
	// 		await client.query("begin")
	// 		await UserTest.createUser("test", client.query)
	// 	}
	// 	// TODO this will need a transaction by knex
	// 	// const trx = await User.startTransaction();
	// 	// try {
	// 	// 	const user = await User.buildUser({
	// 	// 		firstName,
	// 	// 		lastName,
	// 	// 	});
	// 	// 	// do throw error later
	// 	// 	const auth = await Auth.buildAuth({
	// 	// 		userId: user.id,
	// 	// 		email,
	// 	// 		// TODO password should not be mandatory
	// 	// 		password,
	// 	// 		authType,
	// 	// 		// TODO not sure if this is correct way to do it
	// 	// 		lastLogin: new Date(),
	// 	// 	});
	// 	// 	return {
	// 	// 		id: 1,
	// 	// 		firstName: 'Karlo',
	// 	// 		lastName: 'Karlo',
	// 	// 		email: 'test email',
	// 	// 	};
	// 	// 	// and now should return some data, sure
	// 	// 	// TODO need to commit here
	// 	// } catch (err) {
	// 	// 	console.log('this is error');
	// 	// 	// TODO need to rolback ere
	// 	// 	throw new Error('Just a temp error');
	// 	// 	// TODO should i throw error or now
	// 	// 	// TODO should probably create custom errors osmwho
	// 	// 	// throw Internalse
	// 	// 	// TODO do create custom error - for db entry, for isntance?
	// 	// }
	// },
});
