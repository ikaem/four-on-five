import { PlayerStatsModelCreateArgs } from '../../models/player-stats';

// this will get more data later
export const playerStatsArgsGenerate = (playerId: number) => {
	const args: PlayerStatsModelCreateArgs = {
		playerId,
	};

	return args;
};
