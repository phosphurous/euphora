const {sequelize} = require('../config/database');
const { DataTypes } = require('sequelize');


const Alias = sequelize.define(
    'Alias',{
        alias_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        alias_name :{
            type : DataTypes.STRING,
            allowNull : false,
        }
    },{
        timestamps : false,
    }
)

module.exports = Alias;