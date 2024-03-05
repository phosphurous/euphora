const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Product = sequelize.define(
    "Product", {
        product_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement: true,
        },
        name: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        // type: {
        //     type : DataTypes.STRING,
        //     allowNull : false,
        // },
        image : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        // date_added : {
        //     type : DataTypes.DATEONLY,
        //     allowNull: false,
        // }
    },
    {
      timestamps: false,
      tableName: "product"
    }
)

module.exports = Product;