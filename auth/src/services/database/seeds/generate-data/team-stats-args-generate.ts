import { TeamStatsModelCreateArgs } from '../../models/team-stats';

// this will get more data later
export const teamStatsArgsGenerate = (teamId: number) => {
	const args: TeamStatsModelCreateArgs = {
		teamId,
	};

	return args;
};
