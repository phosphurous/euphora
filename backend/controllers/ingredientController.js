const {img_to_text} = require('./ocrController.js');
const Ingredient = require('../models/ingredient');
const {supabase} = require('../config/database')
const {generatEmbeddings} = require('../utils/matching_helpers')
const Profile = require("../models/profile");
const stringSimilarity = require("string-similarity");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {GEMINI_API_KEY} = require('../utils/config')


const similar_ingredients = async(req,res) => {
    const ingredient_name = req.query.ingredient_name
    const similar_ingredients =  await get_similar_ingredients(ingredient_name);
    return res.status(200).json({similar_ingredients: similar_ingredients});
}

const is_allergic = async(req,res) => {
    const ingredient_name = req.query.ingredient_name
    const profile_id = req.params.id;
    const score = await get_allergy_confidence(profile_id, ingredient_name)
    if (score === null){
        return res.status(400).json({error: "profile_id not found"});
    }
    return res.status(200).json({...score});
}

const get_allergy_confidence_of_ingredient_list_in_image = async(req,res) => {
    const {buffer, mimetype} = req.file
    const profile_id = req.params.id;

    console.log(req.file)

    const ingredient_list = await img_to_text(buffer, mimetype);
    if(!ingredient_list){
        return res.status(400).json({message:"invalid image"});
    }
    // const embedded_list = []
    // for (const ingredient of ingredient_list){
    //     const embedding = await generatEmbeddings(ingredient)
    //     embedded_list.push({embedding: embedding, query_ingredient:ingredient});
    // }

    const allergic_ingredients = await getAllergies(profile_id);
    if(allergic_ingredients === null){
        return res.status(400).json({message: "Invalid profile_id"})
    }
    const arr_of_ingredient_names = allergic_ingredients.map(i => i.name.toLowerCase())
    console.log(allergic_ingredients)
    if (allergic_ingredients.length < 1){
        return res.status(200).json({ingredient_list, message: "no allergy"})
    }

    const output = [];
    // let max_score = 0;
    // let nearest_allergy = null;
    for (const ingredient of ingredient_list) {
        const {bestMatch}  = await stringSimilarity.findBestMatch(ingredient.toLowerCase(), arr_of_ingredient_names);
        const max_score = bestMatch.rating;
        const nearest_allergy = bestMatch.target;
        output.push({ingredient, nearest_allergy, max_score})
    }
// chunking
    // const cut_embedded_list = embedded_list.reduce((result, item, index) => {
    //     const chunkIndex = Math.floor(index / 3);
    //     if (!result[chunkIndex]) {
    //         result[chunkIndex] = []; // Initialize chunk if it doesn't exist
    //     }
    //     result[chunkIndex].push(item);
    //     return result;
    // }, []);

// batch query
    // const embedded_list = [{embedding: await generatEmbeddings("niacin"), query_ingredient: "niacin"}]
    // for (const list of cut_embedded_list) {
    //     list.forEach(({query_ingredient, embedding}) => console.log(query_ingredient));
        // const { data, error } =await supabase.rpc('batch_match', {
        //     embedding_list : list,
        //     match_threshold : 0.9,
        //     match_count : 1,
        // })
        // console.log(data, error)
        // output.push(data)
        
// if we do 1 by 1 but it is horribly slow
        // try {
        //     for (const ingredient of ingredient_list) {
        //         const confidence = await get_allergy_confidence(profile_id, ingredient)
        //         console.log(confidence)
        //         output.push({ingredient_in_list: ingredient, ...confidence})
        //     }
        //     return res.status(200).json({output});
        // } catch (error) {
        //     return res.status(400).json({error});
        // }
        return res.status(200).json({output})
    }

const get_AI_repsonse_on_allergy = async (req, res) => {
    const ingredient_name = req.query.ingredient_name
    const profile_id = req.params.id;
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    
    const allergies = await getAllergies(profile_id);
    console.log("allergies",allergies)
    if (allergies === null){
        return res.status(400).json({message: "invalid profile id"});
    }
    else if (allergies.length < 1){
        return res.status(200).json({message: "no allergies"});
    }
    
    let allergy_msg = "and I am allergic to ";
    allergies.forEach(({name}) => allergy_msg += ` ${name},`);
    
    const {condition, skin_type} = await Profile.findOne({where : {profile_id : profile_id}})
    const skin_type_msg = `I have ${skin_type} skin type`;
    let conditions_msg = " and the following conditions ";
    condition.forEach((c) => conditions_msg += `${c}, `);
    const ingredient_msg = ` what are the possible sideeffects if i were to use a skin care product with ${ingredient_name}?`
    const query = skin_type_msg + conditions_msg + allergy_msg + ingredient_msg;
    
    // // console.log(query)
    // const test1 = "I have oily skin type and the following conditions eczema, acne, psoriasis, and I am allergic to  water, glycerol, what are the possible sideeffects if i were to use a skin care product with niacinanmide?"
    // const test2 = "what are the some issues "
    

    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({"response": text});
    // return res.status(200).json({text});
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
    const allergic_ingredients = await getAllergies(profile_id);
    if(allergic_ingredients === null){
        return null;
    }
    const arr_of_ingredient_names = allergic_ingredients.map(i => i.name.toLowerCase())
    console.log(allergic_ingredients)
    if (allergic_ingredients.length < 1){
        // no allergies
        return 0
    }
    const similar_ingredients = await get_similar_ingredients(ingredient_name);
    let max_score = 0;
    let nearest_allergy = null;
    for (const {ingredient_name: i} of similar_ingredients) {
        const {bestMatch}  = await stringSimilarity.findBestMatch(i.toLowerCase(), arr_of_ingredient_names);
        if (bestMatch.rating > max_score){
            console.log(bestMatch)
            max_score = bestMatch.rating;
            nearest_allergy = bestMatch.target;
        }
    }
    return {nearest_allergy, max_score};
}

const getAllergies = async(profile_id) => {
    const profile = await Profile.findOne({
        where : {profile_id : profile_id},
        include : [
            {model: Ingredient}
        ]
    })
    if(!profile){
        return null;
    }
    const {Ingredients:allergies} = profile;
    allergic_ingredients = allergies.map(a => {
        return {id: a["ingredient_id"], name:a["ingredient_name"]}
    })
    return allergic_ingredients
}

module.exports = {get_AI_repsonse_on_allergy, similar_ingredients, is_allergic, get_allergy_confidence_of_ingredient_list_in_image}