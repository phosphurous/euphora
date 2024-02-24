const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const ProfileIngredient = sequelize.define(
    "ProfileIngredient", 
    {},
    {
        timestamps : false
    }
)

const RoutineProduct = sequelize.define(
  "RoutineProduct",
  {},
    {
        timestamps : false
    }
)

module.exports = { ProfileIngredient, RoutineProduct }