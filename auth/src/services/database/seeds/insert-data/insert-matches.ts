import { playersGet } from '../../api/getters/players-get';
import { teamsGet } from '../../api/getters/teams-get';
import { matchCreate } from '../../api/setters/match-create';
import { PoolGetClient } from '../../db';
import { generateMatchArgs } from '../generate-data/generate-match-args';
import { generateMatchStatsArgs } from '../generate-data/generate-match-stats-args';

export const insertMatches = async (getClient: PoolGetClient) => {
	const players = await playersGet(getClient)();
	const [team1, team2] = await teamsGet(getClient)({ limit: 2 });

	for (const player of players) {
		const { organizerId, team1Id, team2Id, matchName, description, matchDate, location } =
			generateMatchArgs(player.id, team1.id, team2.id);

		const { team1Score, team2Score } = generateMatchStatsArgs();

		await matchCreate(getClient)({
			organizerId,
			team1Id,
			team2Id,
			matchName,
			description,
			matchDate,
			location,
			team1Score,
			team2Score,
		});
	}
};
