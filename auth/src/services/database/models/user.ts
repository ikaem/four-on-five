import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
	id: number;
	firstName: string;
	lastName: string;
}

// there is that optional thing for passin a prop0etry on creation time, but i dont want that  - nothing is optional
// interface UserCreationAttributes extends

// but here we just dont want to pass id, because we will have db handle it
type UserInputAttributes = Omit<UserAttributes, 'id'>;
interface UserInstance extends Model<UserAttributes, UserInputAttributes>, UserAttributes {
	// TODO these might need to be optional
	createdAt: Date;
	updatedAt: Date;
}

export const User = sequelize.define<UserInstance>(
	'User',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		firstName: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
		lastName: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: true,
		// TODO disabled just so not forget about it
		// paranoid: true
	}
);
