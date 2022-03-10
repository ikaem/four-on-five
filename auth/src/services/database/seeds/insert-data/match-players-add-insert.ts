import { matchTeamsForMatchesGet } from '../../api/getters/match-teams-for-matches-get';
import { matchesGet } from '../../api/getters/matches-get';
import { playersGet } from '../../api/getters/players-get';
import { matchPlayerAdd } from '../../api/setters/match-players-add';
import { PoolGetClient } from '../../db';

export const matchPlayersAddInsert = async (getClient: PoolGetClient) => {
	const matches = await matchesGet(getClient)();

	for (const match of matches) {
		const [matchTeam1, matchTeam2] = await matchTeamsForMatchesGet(getClient)({
			matchIds: [match.id],
			limit: 2,
		});
		const players = await playersGet(getClient)();

		for (const player of players) {
			const playerTeamId = Math.random() > 0.5 ? matchTeam1.id : matchTeam2.id;

			await matchPlayerAdd(getClient)({
				matchId: match.id,
				playerId: player.id,
				matchTeamId: playerTeamId,
			});
		}
	}
};
