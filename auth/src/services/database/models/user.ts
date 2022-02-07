import { JSONSchema, Model, ModelObject } from 'objection';

interface BuildUserArgs {
	firstName: string;
	lastName: string;
}

interface IUser {
	id: number;
	first_name: string;
	last_name: string;
}
export class User extends Model implements IUser {
	id!: number;
	first_name!: string;
	last_name!: string;

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
			},
		};
	}
	// TODO jsut adding comment here to add relations from auth to there
	// but also, to later add relations between matches and participations for isntance?
	// particupations should probably be in the same microsetvice as the matches

	// static getColumnNameMappers() {
	// 	// TODO this might be needed later
	// 	// return snakeCaseMappers();
	// 	return this.columnNameMappers;
	// }

	static buildUser = async ({ firstName, lastName }: BuildUserArgs) => {
		const user = await this.query().insert({
			first_name: firstName,
			last_name: lastName,
		});

		return user;
	};
}

// type UserShape = ModelObject<User>;
