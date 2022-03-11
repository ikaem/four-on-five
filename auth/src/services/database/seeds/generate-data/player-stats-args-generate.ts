import { PlayerInfoModelCreateArgs } from '../../models/player-info';

// this will get more data later
export const playerStatsArgsGenerate = (playerId: number) => {
	const args: PlayerInfoModelCreateArgs = {
		playerId,
	};

	return args;
};
