const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Routine = sequelize.define(
    "Routine", {
        routine_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement: true,
        },
        routine_name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        start_date : {
            type : DataTypes.DATEONLY,
            allowNull : false,
        },
        end_date : {
            type : DataTypes.DATEONLY,
            allowNull : true,
        },
        image : {
            type : DataTypes.STRING,
        }
    }
)

module.exports = Routine;