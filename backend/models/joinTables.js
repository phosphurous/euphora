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
  {},
    {
        timestamps : false,
        tableName: "routine_product"
    }
)

module.exports = { ProfileIngredient, RoutineProduct }