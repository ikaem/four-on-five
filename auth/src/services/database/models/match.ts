import { PoolClient } from 'pg';
import { ModelCreateAttributes } from './types';

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
	location: string;
	createdAt: string;
	editedAt: string;
}

export class MatchModel {
	static create = async (
		{ matchName, description, matchDate, location }: MatchModelCreateArgs,
		client: PoolClient
	) => {
		const createQuery = `
			insert into matches
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
					match_name as matchName,
					description,
					match_date as matchDate,
					location,
					created_at as createdAt,
					edited_at as editedAt
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

	static getAll = async (client: PoolClient) => {
		const getAllQuery = `
			select 
				id,
				match_name as matchName,
				description,
				match_date as matchDate,
				location,
				created_at as createdAt,
				edited_at as editedAt
			from matches
		`;

		const response = await client.query<MatchModelAttributes>(getAllQuery);

		return response.rows;
	};
}
