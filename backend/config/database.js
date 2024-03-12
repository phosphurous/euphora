const { Sequelize } = require("sequelize");
const {DB_URL} = require('../utils/config');
const pg = require('pg')
const { createClient }= require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_PUBLIC_KEY } = require('../utils/config');
const pgvector = require('pgvector/sequelize');


//Setting up connection to DB
pgvector.registerType(Sequelize);
let sequelize = new Sequelize(DB_URL, {
    dialectModule : pg
    //Force Sequelize to store and retrieve as GMT+8
    //timezone: '+08:00',
});
// await sequelize.query('CREATE EXTENSION IF NOT EXISTS vector');
// sequelize.close();
// sequelize = new Sequelize(DB_URL, {
//     logging: false
// });

const supabase = createClient(SUPABASE_URL,SUPABASE_PUBLIC_KEY)
console.log('SUPA INSTANCE:',supabase);

module.exports = {sequelize, supabase};




