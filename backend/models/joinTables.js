const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");


const Allergy = sequelize.define(
    "Allergy", {
        allergy_id :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        }
    },{
        timestamps : false
    }
)

const IngredientAliasJoint = sequelize.define(
    "IngredientAliasJoint", {
        ingredientAliasJoint_id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
        }
    }, {timestamps : false}
)


module.exports = { Allergy , IngredientAliasJoint}