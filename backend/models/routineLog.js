const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const RoutineLog = sequelize.define(
    "RoutineLog", {
        routine_log_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement: true,
        },
        date : {
            type : DataTypes.DATEONLY,
            allowNull : true,
        },
        checklist : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    },
    {
      timestamps: false,
      tableName: "routine_log"
    }
)

module.exports = RoutineLog;