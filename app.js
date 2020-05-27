const fs = require('fs');
const Sequelize = require('sequelize');
let config = JSON.parse(fs.readFileSync('./config.json').toString())
const async = require('async')
//инициализация ORM
const sequelize = new Sequelize(config.database, config.user, config.password, {
	dialect: config.dialect,
	host: config.host,
	define: {
		//отключение дополнительных параметров времени
		timestamps: true,
	},
	logging: false,
});

/****************************
 ** Страна производитель    *
 * @constant Countries      *
 ****************************/
const Countries = sequelize.define(
	'countries',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			comment: 'Идентификатор страны',
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			comment: 'Наименование страны',
		},
	},
	{ comment: 'Страны' },
);

sequelize.sync({ force: false });

let list = fs.readFileSync('./data.txt').toString().split('\n').sort()



async.eachOfSeries(list, async(row, ind) => {
  let country = row.split('- столица')[0]
  Countries.create({name: country })
})