const Account = require("../models/account");
const Ingredient = require("../models/ingredient");
// const Alias = require("../models/alias");
const Profile = require("../models/profile");
const { Allergy } = require("../models/joinTables")
const bcrypt = require("bcrypt");
const { DATEONLY } = require("sequelize");
const Routine = require("../models/routine");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const data =
  { name: "Jack Tan", email: "jack@gmail.com" }



const ingredients_data = [
    {ingredient_id : 1 , ingredient_name : "niacin", is_common_allergen : false},
    {ingredient_id : 2 , ingredient_name : "not relevant", is_common_allergen : false}
]

// @deprecated
// const alias_data = [
//     {alias_id : 1, alias_name : "niacinamide", ingredient_id: 1}, 
//     {alias_id : 2, alias_name : "vitB", ingredient_id: 1},
//     {alias_id : 3, alias_name : "irrelevant", ingredient_id:2},
// ]

const routine_data = [
    {routine_id: 1, routine_name : "routine_a", start_date: new DATEONLY("2020-01-22"), end_date: new DATEONLY("2020-02-24"), "image": "null", profile_id: 1},
    {routine_id: 2, routine_name : "routine_b", start_date: new DATEONLY("2020-03-22"), end_date: new DATEONLY("2023-04-23"), "image": "null", profile_id: 1}
]

const seedData = async () => {
  try {
    data.password = await generateHashedPassword('Tester123');
    
    // await Account.create(data, { raw: true });
    // await Profile.create({profile_id : 1, account_id : 1})
    // await Ingredient.bulkCreate(ingredients_data, {raw:true});
    
    //MISSING TABLE. DONT RUN THESE 2
    // await Allergy.create({allergy_id : 1, profile_id : 1, ingredient_id : 1})
    // await Routine.bulkCreate(routine_data, {raw:true}),
    // console.log("Successfully seeded user " + data.name);
    console.log("[SYSTEM] Successfully seeded all data.")
  } catch(err) {
    console.error("[SYSTEM] Failed to seed user. Error: ", err);
  }
}

module.exports = seedData;