const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');


const Ingredient = sequelize.define(
    'Ingredient', {
        ingredient_id : {
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        ingredient_name: {
            type: DataTypes.STRING,
            primaryKey: false,
            // unique: true,
            allowNull: false,
        },
        embedding : {
            type: DataTypes.VECTOR(384),
            allowNull : true,
        }
        // is_common_allergen : {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull:false,
        // }
    },
    {
      timestamps: false,
      tableName: "ingredient"
    }
)

module.exports = Ingredient;
