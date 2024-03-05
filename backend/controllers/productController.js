const Ingredient = require("../models/ingredient");
const Product = require("../models/product");
const Profile = require("../models/profile");
const {supabase} = require('../config/database')
const {ProfileIngredient} = require('../models/joinTables')

//This is for user to add into the Routine
const getAllProducts = async (req, res) => {
    // const account = req.account;
    try {   
        const allProducts = await Product.findAll({ raw: true });
        return res.status(200).json({ message: "Successfully retrieved all Products.", allProducts } );
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}
const getIngredientsOfProducts = async (req, res) => {
    const product_name = req.query.product_name
    const profile_id = req.params.id;

    try {   
        const all_ingredients_and_product = await Product.findOne({ 
            where : { name : product_name},
            include: [
                {
                    model : Ingredient,
                }
            ]
          });
          if(all_ingredients_and_product == null){
            return res.status(400).json({ message: "Product not found, try another product"} );
          }
          const {Ingredients:ingredients} = all_ingredients_and_product
        //   const arr_of_ingredient_id = ingredients.map(i => i.ingredient_id)
          const arr_of_ingredient_names = ingredients.map(i => i.ingredient_name)
          const allergic_ingredients = await getAllergies(profile_id)
          console.log(allergic_ingredients)
          const output = [] 
          for (const {ingredient_id, ingredient_name} of ingredients) {
                const confidence = await allergyConfidenctGivenIngredient(ingredient_id, allergic_ingredients)
                console.log(ingredient_id, confidence)
                output.push({name: ingredient_name, confidence: confidence})
          }
        return res.status(200).json({ message: "Successfully retrieved all ingredients of product.",  output} );

    } catch (err) {
        return res.status(500).json({ error: err });
    }
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

const allergyConfidenctGivenIngredient = async(ingredient_id, allergic_ingredients) => {
    if (allergic_ingredients.length < 1){
        // no allergies
        return 0
    }
    // boolean if allergy has index == ingredient_id
    const definitelyHasAllergy = allergic_ingredients.some((a) => a.id == ingredient_id)
    if(definitelyHasAllergy){
        return 1;
    }

    // const {ingredient_name} = await Ingredient.findOne({
    //     where : {
    //         ingredient_id : ingredient_id
    //     }
    // })
    // const words = ingredient_name.split(' ');
    // const query_strong = words.join(' & ')
    // const query_weak = words.join(' | ')

    // // try to get a list of similar ingredients and we can take the max (avg(similarity(1allergy, [ingredients])) )
    // const { data:strong_result, error:strong_error } = await supabase.from('ingredient')
    //     .select().textSearch('ingredient_name',query_strong)
    // const { data:weak_result, error:weak_error } = await supabase.from('ingredient')
    //     .select().textSearch('ingredient_name', query_weak)
    // if(strong_error){
    //     return null;
    // }
    // else if(strong_result.length < 1){
    //     if(weak_error){
    //         return null;
    //     }
    //     return weak_result;
    // }
    // return strong_result
    return 0;
}

//for photo upload
// const uploadImage = async (folder, fileName, mimeType, base64Data) => {
//     const filePath = folder + fileName;

//     try {
//         const { data, error } = await supabase
//             .storage
//             .from('images')
//             .upload(filePath, base64Data, {
//                 contentType: `image/${mimeType}`
//             });

//         if (error) {
//             throw new Error(error.message);
//         }

//         return data;
//     } catch (err) {
//         console.error("Error uploading image:", err);
//         return null;
//     }
// };

const addProduct = async (req, res) => {
    // const account_id = req.body.account_id;

    try {

        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }     
        // const imageFolder = "routine/";
        // const mimeType = "png";
  
        // const countAllProducts = await Product.findAndCountAll({ raw: true });
        // const fileName = account_id + "_" + countAllProducts+1;

        // const account_id = req.body.account_id;

        // const getAccount = await Account.findOne({ where: { account_id : account.account_id }, raw: true });
        // const getProfile = await Profile.findOne({ where: { account_id : account_id }, raw: true });

        /** Product Table */
        const productName = req.body.productName;
        const productType = req.body.productType;
        const productDate = new Date().toJSON().slice(0, 10);

        await Product.create({
            name: productName, type: productType, date_added: productDate, image: null
        });

        return res.status(201).json({ message: "Successfully created a product."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const deleteProduct = async (req, res) => {
    const productID = req.params.id;

    try {
        await Product.destroy(
            { where: { product_id: productID }
        });

        return res.status(201).json({ message: "Successfully deleted a product."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

module.exports = { getAllProducts, addProduct, deleteProduct, getIngredientsOfProducts };