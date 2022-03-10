import { MatchPlayerRoleModelCreateArgs } from '../../models/match-player-role';

// this will get more data later
export const matchPlayerRoleArgsGenerate = () => {
	const args: Omit<Omit<MatchPlayerRoleModelCreateArgs, 'matchId'>, 'playerId'> = {
		// TODO this needs some enum
		role: 'creator',
	};

	return args;
};
