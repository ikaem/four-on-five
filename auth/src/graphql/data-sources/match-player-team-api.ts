import DataLoader from 'dataloader';
import { PgDataSource } from './pg-data-source';

export class MatchPlayerTeamApi extends PgDataSource {
	// async loadPlayers

	// todo just create method here
	getAllForMatches = (limit: number) => {
		const loader = new DataLoader((ids: readonly number[]) =>
			this.db.dbGetters.matchPlayerTeamForMatchesGet({ matchIds: ids, limit })
		);

		// return loader;
		// TODO or maybe better even - just because i would not have to call function twice - and also can pass args properly up there, and reuse ts type i already have0000000000000000000000000000000000000
		return loader.loadMany([3]);
	};
}
