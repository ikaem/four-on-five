import { PoolQuery, PoolGetClient } from '../db';
import { userSignup } from './setters/user-signup';

export type Setters = ReturnType<typeof getDbSetters>;

export const getDbSetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	userSignup: userSignup(getClient),
});
