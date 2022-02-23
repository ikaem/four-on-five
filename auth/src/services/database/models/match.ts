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

	// TODO this is going to replace the above one eventually
	// this is just one field on the Full Match type

	// - matches - resolver
	// - match stats - resolver (match stats for matches - pass matches ids)
	// - match participations - resolver (participations for matches - pass matches ids )
	// - organizer - type resolver (organizers for matches - pass organizer ids, resolves to player)
	// - teams - (teams for matches - pass matches id, returns all team match participatons )

	// this means that we remove team ids from matches, make team match its own model, connect team model to a match, and have players match participations actually a player team match
	// and then we would connect player team

	static getMatchesForPlayers = async (
		// TODO should prolly be some default for page and direction and limit
		{ playerIds, limit, direction, page }: GetMatchesForPlayers,
		client: PoolClient
	) => {
		// TODO this could be a general thing actually - and maybe pg can write this to protect against sql injeciton
		const whereMap = {
			players: (playerIds: number[]) => {
				return `
					where player
				
				
				`;
			},
		};
	};
}

// TODO test, move up
interface GetMatchesForPlayers {
	playerIds: number[];
	limit: number;
	// TODO CREATE TYPE FOR THIS
	direction: 'asc' | 'desc';
	page: number;
}
