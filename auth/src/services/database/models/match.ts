import { PoolClient } from 'pg';

export interface MatchAttributes {
	id: number;
	organizerId: number;
	team1Id: number;
	team2Id: number;
	matchName: string;
	description: string;
	matchDate: string;
	// TODO this is json
	location: string;
	createdAt: string;
	editedAt: string;
}

export interface CreateMatchArgs {
	organizerId: number;
	team1Id: number | null;
	team2Id: number | null;
	matchName: string;
	description: string;
	// TODO maybe this is date
	matchDate: string;
	// TODO not sure what should I pass in here
	location: string;
}

export class Match {
	static createMatch = async (
		{
			organizerId,
			team1Id = null,
			team2Id = null,
			matchName,
			description,
			matchDate,
			location,
		}: CreateMatchArgs,
		// TODO caller has responsibility to close the client?
		client: PoolClient
	): Promise<MatchAttributes> => {
		const createMatchQuery = `
      insert into matches
        (
					organizer_id,
					team_1_id,
					team_2_id,
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
					$4,
					$5,
					$6,
					$7
        )
      returning 
					id,
					organizer_id as organizerId,
					team_1_id as team1Id,
					team_2_id as team2Id,
					match_name as matchName,
					description,
					match_date as matchDate,
					location,
					created_at as createdAt,
					edited_at as editedAt
    `;

		const response = await client.query<MatchAttributes>(createMatchQuery, [
			organizerId,
			team1Id,
			team2Id,
			matchName,
			description,
			matchDate,
			location,
		]);

		return response.rows[0];
	};

	// TODO this will eventually need to join and return list of its participations - just ids
	// also, it will eventually maybe need to accept some list of its own ids, so we can get for instance team matches, or player matches
	// but do this only when we need it
	static getMatches = async (client: PoolClient) => {
		const getMatchesQuery = `
			select
				id,
				organizer_id as organizerId,
				team_1_id as team1Id,
				team_2_id as team2Id,
				match_name as matchName,
				description,
				match_date as matchDate,
				location,
				created_at as createdAt,
				edited_at as editedAt
			from matches
		`;

		const response = await client.query<MatchAttributes>(getMatchesQuery);

		return response.rows;
	};
}
