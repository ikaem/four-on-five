import { JSONSchema, Model } from 'objection';

class User extends Model {
	static get tableName() {
		return 'users';
	}

	static get idColumn() {
		return ['id'];
	}

	static get jsonSchema(): JSONSchema {
		return {
			type: 'object',
			required: ['first_name', 'last_name'],

			properties: {
				id: {
					type: 'integer',
				},
				first_name: {
					type: 'string',
				},
				last_name: {
					type: 'string',
				},
				// TODO how to make this auto created
				created_at: {
					type: 'integer',
					format: 'timestamp',
				},
			},
		};
	}
}

export default User;
