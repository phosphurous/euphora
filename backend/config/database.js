const { Sequelize } = require("sequelize");
const {DB_URL} = require('../utils/config');
const pg = require('pg')


//Setting up connection to DB
const sequelize = new Sequelize(DB_URL, {
    dialectModule : pg
    //Force Sequelize to store and retrieve as GMT+8
    //timezone: '+08:00',
});

module.exports = sequelize;