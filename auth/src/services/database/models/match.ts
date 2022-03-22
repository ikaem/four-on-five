import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

interface Location {
	// TODO it should be a number?, but i guess i do send it like a string? or does it?
	latitude: string;
	longitude: string;
}

export interface MatchModelCreateArgs {
	matchName: string;
	description: string;
	matchDate: string;
	location: string;
}

export interface MatchModelAttributes {
	id: number;
	matchName: string;
	description: string;
	matchDate: string;
	location: Location;
	createdAt: string;
	editedAt: string;
}

export interface MatchModelGetArgs {
	matchIds: readonly number[];
	limit: number | null;
}

export class MatchModel {
	static create = async (
		{ matchName, description, matchDate, location }: MatchModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into match
				(
					match_name,
					description,
					match_date,
					location
				)
			values 
				(
					$1,
					$2,
					$3,
					$4
				)
			returning 
					id,
					match_name as "matchName",
					description,
					match_date as "matchDate",
					location,
					created_at as "createdAt",
					edited_at as "editedAt"
		`;

		const response = await client.query<ModelCreateAttributes<MatchModelAttributes>>(createQuery, [
			matchName,
			description,
			matchDate,
			location,
		]);

		const result = response.rows[0];

		return result;
	};

	static get = async ({ matchIds, limit = null }: MatchModelGetArgs, client: PoolClient) => {
		const getQuery = `
			select 
				id,
				match_name as "matchName",
				description,
				match_date as "matchDate",
				location,
				created_at as "createdAt",
				edited_at as "editedAt"
			from match
			where id = any($1)
			limit $2
		`;

		// TODO this thing will actually automatically parse json for location
		const response = await client.query<MatchModelAttributes>(getQuery, [matchIds, limit]);
		console.log({ response: response.rows[0] });

		return response.rows;
	};

	static getAll = async (client: PoolClient) => {
		const getAllQuery = `
			select 
				id,
				match_name as "matchName",
				description,
				match_date as "matchDate",
				location,
				created_at as "createdAt",
				edited_at as "editedAt"
			from match
		`;

		const response = await client.query<MatchModelAttributes>(getAllQuery);

		return response.rows;
	};
}
