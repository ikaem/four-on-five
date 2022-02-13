import { PoolQuery } from '../db';

export class UserTest {
	private constructor() {
		// TODO this could be
		if (new.target === UserTest) throw new Error('This class cannot be instantiated');
	}

	// TODO how to get db insite, or the client, or just hte pool?
	static createUser = async (userArgs: any, client: PoolQuery) => {
		const query = `
      insert into users
        (
          first_name,
          last_name,
          some_timestamps
        )
      values 
        (
          $1,
          $2,
          $3,
          $4
        )
      returning 
          id,
          first_name as firstName,
          last_name as lastName,
    `;

		// const response = await client.query(query, [userArgs.firstName, userArgs.lastName]);
		console.log('query', query);
	};
}