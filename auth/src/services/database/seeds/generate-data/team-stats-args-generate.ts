import { TeamStatsModelCreateArgs } from '../../models/team-stats';

// this will get more data later
// TODO this is not needed for now, but might be later for some initial stats of the team
export const teamStatsArgsGenerate = (teamId: number) => {
	const args: TeamStatsModelCreateArgs = {
		teamId,
	};

	return args;
};
