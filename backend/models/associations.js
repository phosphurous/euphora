const Account = require('./account');
const Profile = require('./profile')
const Ingredient = require('./ingredient')
const Alias = require('./alias')
const {Allergy} = require('./joinTables');
const Routine = require('./routine');


const initAssociations = () => {
    // one account --> one profile
    Account.hasOne(Profile, {foreignKey: "account_id"})
    Profile.belongsTo(Account,{foreignKey: "account_id"})

    // many profile --> many allergy
    Profile.belongsToMany(Ingredient, {through : Allergy, foreignKey:"profile_id", timestamps:false})
    Ingredient.belongsToMany(Profile, {through: Allergy, foreignKey:"ingredient_id", timestamps:false})

    // one profile --> many routine
    Profile.hasMany(Routine, {foreignKey: "profile_id"})
    Routine.belongsTo(Profile, {foreignKey: "profile_id"})


    // one ingredient --> many alias
    Alias.belongsTo(Ingredient, {foreignKey:"ingredient_id"})
    Ingredient.hasMany(Alias, {foreignKey:"ingredient_id"})


}

module.exports = initAssociations;