const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const ProfileIngredient = sequelize.define(
    "ProfileIngredient", 
    {},
    {
        timestamps : false,
        tableName: "profile_ingredient"
    }
)

const RoutineProduct = sequelize.define(
  "RoutineProduct",
    {
        routine_product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Assuming you want an auto-incrementing primary key
        }
    },
    {
        timestamps : false,
        tableName: "routine_product"
    }
)

module.exports = { ProfileIngredient, RoutineProduct }