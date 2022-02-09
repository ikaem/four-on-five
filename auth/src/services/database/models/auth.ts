import { Model, JSONSchema, RelationMappings, RelationMappingsThunk } from 'objection';
import { User } from '..';

// TODO not sure if this should stay here
enum AuthType {
	FACEBOOK = 'FACEBOOK',
	GOOGLE = 'GOOGLE',
	PASSWORD = 'PASSWORD',
}

interface BuildAuthArgs {
	userId: number;
	email: string;
	password: string;
	authType: AuthType;
	// TODO not sure if it should be date - also, want not to have to pass it in
	// it should probably need to pass it in
	lastLogin: Date;
}

interface AuthAttributes {
	id: number;
	user_id: number;
	email: string;
	password?: string;
	auth_type: AuthType;
	// TODO or is this date
	last_login: Date;
	// TODO should add created dates too
}

export class Auth extends Model implements AuthAttributes {
	id!: number;
	user_id!: number;
	email!: string;
	password?: string;
	auth_type!: AuthType;
	// TODO or is this date
	last_login!: Date;

	static get tableName() {
		return 'auth';
	}

	static get idColumn() {
		return ['id'];
	}

	static get jsonSchema(): JSONSchema {
		return {
			type: 'object',
			// TODO we will need to remove password later
			// TODO how to avoid passing last login
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
					// TODO not sure about this is the correct property
					uniqueItems: true,
				},
				password: {
					type: 'string',
				},
				// TODO can we set an enum here?
				auth_type: {
					type: 'string',
					// enum: ['PASSWORD', 'FACEBOOK', 'GOOGLE'],
					enum: [AuthType.PASSWORD, AuthType.GOOGLE, AuthType.FACEBOOK],
				},
				// TODO maybe do
				last_login: {
					type: 'integer',
					// is this correct type - check docs
					// TODO maybe this is not needed
					format: 'timestamp',
				},
			},
		};
	}

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		user: {
			// used to point to table with primary key that matches this table's foreign key - but is one to one
			relation: Model.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'auth.user_id',
				to: 'users.id',
			},
		},
	};

	// TODO this will need to have relations with the user

	static buildAuth = async ({ userId, email, password, authType, lastLogin }: BuildAuthArgs) => {
		const user = await this.query().insert({
			user_id: userId,
			email: email,
			password: password,
			auth_type: authType,
			last_login: lastLogin,
		});

		return user;
	};
}
