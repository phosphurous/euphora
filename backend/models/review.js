const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Review = sequelize.define(
    "Review", {
        review_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement: true,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        rating: {
            type : DataTypes.INTEGER,
            allowNull: false,
        },
        isEffective: {
            type : DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
      timestamps: false,
      tableName: "review"
    }
)

module.exports = Review;