// import { JSONSchema, Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
// import { Auth } from './auth';

// interface BuildUserArgs {
// 	firstName: string;
// 	lastName: string;
// }

// interface UserAttributes {
// 	id: number;
// 	first_name: string;
// 	last_name: string;
// 	// TODO should add created dates too
// }
// export class User extends Model implements UserAttributes {
// 	id!: number;
// 	first_name!: string;
// 	last_name!: string;

// 	static get tableName() {
// 		return 'users';
// 	}

// 	static get idColumn() {
// 		return ['id'];
// 	}

// 	static get jsonSchema(): JSONSchema {
// 		return {
// 			type: 'object',
// 			required: ['first_name', 'last_name'],

// 			properties: {
// 				id: {
// 					type: 'integer',
// 				},
// 				first_name: {
// 					type: 'string',
// 				},
// 				last_name: {
// 					type: 'string',
// 				},
// 			},
// 		};
// 	}

// 	// static relationMappings: RelationMappings | RelationMappingsThunk = {
// 	// 	auth: {
// 	// 		// used to point to table with foreign key that matches this table's primary key - but is one to one
// 	// 		relation: Model.HasOneRelation,
// 	// 		modelClass: Auth,
// 	// 		join: {
// 	// 			from: 'users.id',
// 	// 			to: 'auth.user_id',
// 	// 		},
// 	// 	},
// 	// };

// 	static buildUser = async ({ firstName, lastName }: BuildUserArgs) => {
// 		const user = await this.query().insert({
// 			first_name: firstName,
// 			last_name: lastName,
// 		});

// 		return user;
// 	};
// }
