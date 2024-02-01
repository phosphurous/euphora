const Account = require('./account');
const Profile = require('./profile')
const Ingredient = require('./ingredient')
const Alias = require('./alias')
const {Allergy, IngredientAliasJoint} = require('./joinTables')


const initAssociations = () => {
    Account.hasOne(Profile, {foreignKey: "account_id"})
    Profile.belongsTo(Account,{foreignKey: "account_id"})

    Profile.belongsToMany(Ingredient, {through : Allergy, foreignKey:"profile_id", timestamps:false})
    Ingredient.belongsToMany(Profile, {through: Allergy, foreignKey:"ingredient_id", timestamps:false})


    Alias.belongsToMany(Ingredient, {through : IngredientAliasJoint, foreignKey:"alias_id", timestamps:false})
    Ingredient.belongsToMany(Alias, {through: IngredientAliasJoint, foreignKey:"ingredient_id", timestamps:false})
}

module.exports = initAssociations;