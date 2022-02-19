import { PoolQuery } from '../../db';
import { UserTest } from '../../models/user-test';

export const getUsers = (query: PoolQuery) => async () => {
	// lets get all users here

	return await UserTest.getUsers(query);
};
