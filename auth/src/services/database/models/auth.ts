import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';

// TODO not sure if this should stay here
enum AuthType {
	FACEBOOK = 'FACEBOOK',
	GOOGLE = 'GOOGLE',
	PASSWORD = 'PASSWORD',
}

interface AuthAttributes {
	id: number;
	userId: number;
	authType: AuthType;
	// since we are going with dates - this should be passed every time
	lastLogin: Date;
	email: string;
	// TODO probably should not be optional? or shouild it?
	password?: string;
}

// there is that optional thing for passin a prop0etry on creation time, but i dont want that  - nothing is optional
// interface UserCreationAttributes extends

// but here we just dont want to pass id, because we will have db handle it
// prefer Omit to Optional, because I dont want to pass id at any circumstance
type AuthInputAttributes = Omit<Optional<AuthAttributes, 'password'>, 'id'>;
interface AuthInstance extends Model<AuthAttributes, AuthInputAttributes>, AuthAttributes {
	// TODO these might need to be optional
	createdAt: Date;
	updatedAt: Date;
}

export const User = sequelize.define<AuthInstance>(
	'User',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		userId: {
			allowNull: false,
			type: DataTypes.INTEGER.UNSIGNED,
			// TODO need to set foreign key here somehow
		},
		authType: {
			allowNull: false,
			type: DataTypes.ENUM({
				// come back to this
				values: [AuthType.FACEBOOK, AuthType.GOOGLE, AuthType.PASSWORD],
			}),
		},

		lastLogin: {
			allowNull: true,
			// TODO better timestamp probably
			type: DataTypes.DATE,
		},

		email: {
			allowNull: false,
			type: DataTypes.TEXT,
			unique: true,
		},
	},
	{
		timestamps: true,
		// TODO disabled just so not forget about it
		// paranoid: true
	}
);
