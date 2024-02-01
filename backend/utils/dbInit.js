const Account = require("../models/account");
const Ingredient = require("../models/ingredient");
const Alias = require("../models/alias");
const Profile = require("../models/profile");
const {Allergy} = require("../models/joinTables")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { IngredientAliasJoint } = require("../models/joinTables");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const data =
  { name: "Jack Tan", email: "jack@gmail.com", account_type: "user" }



const ingredients_data = [
    {ingredient_id : 1 , ingredient_name : "niacin", isCommonAllergen : false},
    {ingredient_id : 2 , ingredient_name : "not relevant", isCommonAllergen : false}
]
const alias_data = [
    {alias_id : 1, alias_name : "niacinamide"}, 
    {alias_id : 2, alias_name : "vitB"},
    {alias_id : 3, alias_name : "irrelevant"}
]




const seedData = async () => {
  try {
    // data.password = await generateHashedPassword('Tester123');
    // const newAccount = await Account.create(data, { raw: true });
    
    // const user = { account_id: newAccount.account_id };
    // const newUser = await User.create(user);
    // await Profile.create({profile_id : 1, account_id : 1})
    // await Ingredient.bulkCreate(ingredients_data, {raw:true});
    // await Alias.bulkCreate(alias_data, {raw:true});
    // await IngredientAliasJoint.bulkCreate([{ingredient_id : 1, alias_id : 1}, {ingredient_id : 1, alias_id : 2}, {ingredient_id : 2, alias_id : 3}])
    // await Allergy.create({allergy_id : 1, profile_id : 1, ingredient_id : 1})
    
    // console.log("Successfully seeded user " + data.name);
    console.log("[SYSTEM] Successfully seeded all data.")
  } catch(err) {
    console.error("[SYSTEM] Failed to seed user. Error: ", err);
  }
}

module.exports = seedData;