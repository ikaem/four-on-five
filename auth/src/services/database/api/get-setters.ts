import { PoolQuery, PoolGetClient } from '../db';

export type Setters = ReturnType<typeof getSetters>;

export const getSetters = (query: PoolQuery, getClient: PoolGetClient) => ({});
