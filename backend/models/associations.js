const Account = require('./account');
const Profile = require('./profile')
const Ingredient = require('./ingredient')
const Alias = require('./alias')
const {ProfileIngredient, RoutineProduct} = require('./joinTables');
const Routine = require('./routine');
const Product = require('./product');
const RoutineLog = require('./routineLog');
const SkinAnalysis = require('./skinAnalysis');
const Review = require('./review');

const initAssociations = () => {
    // one account --> one profile
    Account.hasOne(Profile, {foreignKey: "account_id"})
    Profile.belongsTo(Account,{foreignKey: "account_id"})

    // many profile --> many allergies
    Profile.belongsToMany(Ingredient, {through : ProfileIngredient, foreignKey:"profile_id", timestamps:false})
    Ingredient.belongsToMany(Profile, {through: ProfileIngredient, foreignKey:"ingredient_id", timestamps:false})

    // one profile --> many routine
    Profile.hasMany(Routine, {foreignKey: "profile_id"})
    Routine.belongsTo(Profile, {foreignKey: "profile_id"})

    // one ingredient --> many alias
    Alias.belongsTo(Ingredient, {foreignKey:"ingredient_id"})
    Ingredient.hasMany(Alias, {foreignKey:"ingredient_id"})

    // many product --> many routines
    Product.belongsToMany(Routine, {through : RoutineProduct, foreignKey:"product_id", timestamps:false})
    Routine.belongsToMany(Product, {through: RoutineProduct, foreignKey:"routine_id", timestamps:false})

    // one routine_product --> many routine_log
    RoutineProduct.hasMany(RoutineLog, {foreignKey: "routine_product_id"})
    RoutineLog.belongsTo(RoutineProduct, {foreignKey: "routine_product_id"})

    // one profile --> many skin_analysis
    Profile.hasMany(SkinAnalysis, {foreignKey: "profile_id"})
    SkinAnalysis.belongsTo(Profile, {foreignKey: "profile_id"})

    // one profile --> many reviews
    Profile.hasMany(Review, {foreignKey: "profile_id"})
    Review.belongsTo(Profile, {foreignKey: "profile_id"})

    // one product --> many reviews
    Product.hasMany(Review, {foreignKey: "product_id"})
    Review.belongsTo(Product, {foreignKey: "product_id"})
}

module.exports = initAssociations;