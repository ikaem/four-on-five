// import { readdirSync } from 'fs';
// import Sequelize, { DataTypes } from 'sequelize';

// const basename = _basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/database.config.js')[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
// 	sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
// 	sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// readdirSync(__dirname)
// 	.filter((file) => {
// 		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
// 	})
// 	.forEach((file) => {
// 		const model = require(join(__dirname, file))(sequelize, DataTypes);
// 		db[model.name] = model;
// 	});

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

import { Sequelize } from 'sequelize';
import { NODE_ENV } from '../../../common';
import { dbConfigs } from '../config/database.config';

const config = dbConfigs[NODE_ENV];

const sequelize = new Sequelize(config);

export { Sequelize, sequelize };
