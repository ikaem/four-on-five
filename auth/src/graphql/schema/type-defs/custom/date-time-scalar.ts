import { GraphQLScalarType } from 'graphql';

export const DateTimeScalar = new GraphQLScalarType({
	name: 'DateTimeType',
	description: 'Custom datetime scalar',
	serialize(value: unknown) {
		return new Date(value as Date).toISOString();
	},
	parseValue(value: unknown) {
		// TODO this needs checking if actually string comes in
		return new Date(value as string);
	},
	parseLiteral(value: unknown) {
		// TODO this needs checking if we actually want to store date into the db
		return new Date(parseInt(value as string));
	},
});
