import { PoolQuery, PoolGetClient } from '../db';
import { teamCreate } from './setters/team-create';
import { userSignup } from './setters/user-signup';

export type Setters = ReturnType<typeof getDbSetters>;

export const getDbSetters = (query: PoolQuery, getClient: PoolGetClient) => ({
	userSignup: userSignup(getClient),
	teamCreate: teamCreate(getClient),
});
