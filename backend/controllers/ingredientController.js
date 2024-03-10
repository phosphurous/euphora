const Ingredient = require('../models/ingredient');
const {supabase} = require('../config/database')
const {generatEmbeddings} = require('../utils/matching_helpers')
const Profile = require("../models/profile");
const stringSimilarity = require("string-similarity");



const similar_ingredients = async(req,res) => {
    const ingredient_name = req.query.ingredient_name
    const similar_ingredients =  await get_similar_ingredients(ingredient_name);
    return res.status(200).json({similar_ingredients: similar_ingredients});
}

const is_allergic = async(req,res) => {
    const ingredient_name = req.query.ingredient_name
    const profile_id = req.params.id;
    const score = await get_allergy_confidence(profile_id, ingredient_name)

    return res.status(200).json({...score});
}




// helpers
const get_similar_ingredients = async(ingredient_name) => {
    let embedding = await generatEmbeddings(ingredient_name);
    embedding = JSON.parse(embedding)
    const { data: ingredient } = await supabase.rpc('match_ingredients', {
        query_embedding: embedding, // Pass the embedding you want to compare
        match_threshold: 0.7, // Choose an appropriate threshold for your data
        match_count: 10, // Choose the number of matches
      })
      return ingredient;
}
const get_allergy_confidence = async (profile_id, ingredient_name) => {
    const allergic_ingredients = await getAllergies(profile_id)
    const arr_of_ingredient_names = allergic_ingredients.map(i => i.name)
    console.log(allergic_ingredients)
    if (allergic_ingredients.length < 1){
        // no allergies
        return 0
    }
    const similar_ingredients = await get_similar_ingredients(ingredient_name);
    let max_score = 0;
    let nearest_allergy = null;
    for (const {ingredient_name: i} of similar_ingredients) {
        const {bestMatch}  = await stringSimilarity.findBestMatch(i, arr_of_ingredient_names);
        if (bestMatch.rating > max_score){
            console.log(bestMatch)
            max_score = bestMatch.rating;
            nearest_allergy = bestMatch.target;
        }
    }
    return {nearest_allergy, max_score};
}

const getAllergies = async(profile_id) => {
    const {Ingredients:allergies} = await Profile.findOne({
        where : {profile_id : profile_id},
        include : [
            {model: Ingredient}
        ]
    })
    allergic_ingredients = allergies.map(a => {
        return {id: a["ingredient_id"], name:a["ingredient_name"]}
    })
    return allergic_ingredients
}

module.exports = {similar_ingredients, is_allergic}