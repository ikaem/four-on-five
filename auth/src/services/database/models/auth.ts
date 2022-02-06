import { Model, JSONSchema } from 'objection';

class Auth extends Model {
	static get tableName() {
		return 'auth';
	}

	static get idColumn() {
		return ['id'];
	}

	static get jsonSchema(): JSONSchema {
		return {
			type: 'object',
			required: ['id', 'user_id', 'email', 'password', 'auth_type', 'last_login'],

			properties: {
				id: {
					type: 'integer',
				},
				user_id: {
					type: 'integer',
				},
				email: {
					type: 'string',
				},
				password: {
					type: 'string',
				},
				// TODO can we set an enum here?
				auth_type: {
					type: 'string',
				},
				// TODO maybe do
				updated_at: {
					type: 'integer',
					// is this correct type - check docs
					// TODO maybe this is not needed
					format: 'timestamp',
				},
			},
		};
	}
}

export default Auth;
