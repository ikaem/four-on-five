import { CreatePlayerMatchParticipationArgs } from '../../models/player-match-participation';

export const generatePlayerMatchParticipationArgs = (
	playerId: number,
	matchId: number,
	teamId: number
) => {
	const args: CreatePlayerMatchParticipationArgs = {
		playerId,
		matchId,
		teamId,
	};

	return args;
};
