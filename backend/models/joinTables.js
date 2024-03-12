const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const ProfileIngredient = sequelize.define(
    "profile_ingredient", 
    {},
    {
        timestamps : false,
    }
)

const IngredientProduct = sequelize.define(
    "IngredientProduct", 
    {
        ingredient_product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming you want an auto-incrementing primary key
        }
    },
    {
        timestamps : false,
        tableName: "IngredientProduct"
    }
)

const RoutineProduct = sequelize.define(
  "routine_product",
    {
        routine_product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming you want an auto-incrementing primary key
        }
    },
    {
        timestamps : false,
    }
)

module.exports = { ProfileIngredient, RoutineProduct, IngredientProduct }
