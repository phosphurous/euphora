const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const SkinAnalysis = sequelize.define(
    "SkinAnalysis", {
        skin_analysis_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement: true,
        },
        date_time : {
            type : DataTypes.DATE,
            allowNull : true,
        },
        overall_score : {
            type : DataTypes.DATEONLY,
            allowNull : true,
        },
        image : {
            type : DataTypes.STRING,
            allowNull: true
        },
        result: {
            type : DataTypes.STRING,
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: "skin_analysis"
    }
)

module.exports = SkinAnalysis;