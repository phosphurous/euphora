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
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        type: {
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
        frequency : {
            type : DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    {
      timestamps: false,
      tableName: "routine"
    }
)

module.exports = Routine;