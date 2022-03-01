import { TeamPlayerRoleModelCreateArgs } from '../../models/team-player-role';

// this will get more data later
export const teamPlayerRoleArgsGenerate = () => {
	const args: Omit<Omit<TeamPlayerRoleModelCreateArgs, 'teamId'>, 'playerId'> = {
		// TODO this needs some enum
		role: 'creator',
	};

	return args;
};
