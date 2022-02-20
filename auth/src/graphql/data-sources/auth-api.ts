import { PgApi } from '../../services/database/api/api';
import { UserSignupArgs } from '../../services/database/api/setters/user-signup';
import { PgDataSource } from './pg-data-source';

export class AuthApi extends PgDataSource {
	constructor(dbApi: PgApi) {
		super(dbApi);
	}

	async userSignup(args: UserSignupArgs) {
		return await this.dbApi.dbSetters.userSignup(args);
	}
}
