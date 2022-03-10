import { MatchStatsModelCreateArgs } from '../../models/match-stats';

// this will get more data later
// TODO this is not needed for now, but might be later for some initial stats of the team
export const matchStatsArgsGenerate = (matchId: number) => {
	const args: MatchStatsModelCreateArgs = {
		matchId,
	};

	return args;
};
