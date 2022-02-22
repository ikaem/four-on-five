import { CreateMatchStatsArgs } from '../../models/match-stats';

// TODO dont even need this for seedeing
export const generateMatchStatsArgs = () => {
	const args: Omit<CreateMatchStatsArgs, 'matchId'> = {
		team1Score: null,
		team2Score: null,
	};

	return args;
};
