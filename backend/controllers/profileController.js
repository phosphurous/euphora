const Profile = require('../models/profile');
const Ingredient = require('../models/ingredient');
const { Allergy } = require('../models/joinTables');


const get_profile_from_acc_id = async(req, res) => {
    acc_id = validate_user_id_in_params(req, res);
    try {
        const profile = await getProfile(req, res, acc_id);
        console.log("hello",profile);
        return res.status(200).json({
            ...profile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

const get_all_allergies = async(req,res) => {
    const acc_id = validate_user_id_in_params(req,res);
    try {
        const profile = await getProfile(req, res, acc_id);
        console.log("hey: ",profile);
        const { profile_id } = profile;
        const ingredient_profile_obj = await Ingredient.findAll({ 
            include : [{
                model : Profile,
                through : Allergy,
                attributes : [],
                where : {profile_id : profile_id}
            }] 
        })
            console.log(ingredient_profile_obj)
        res.status(200).json(...ingredient_profile_obj)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}



// helper methods

const validate_user_id_in_params = (req, res) => {
    const acc_id = req.params.id
    if(acc_id === undefined){
        return res.status(400).json({
            message : "invalid user id"
        })
    }
    return acc_id;
}

const getProfile = async(req, res, acc_id) => {
    const profileObj = await Profile.findOne({
        where : {
            account_id: acc_id,
        }
    })
    if (profileObj === null){
        console.log("user not found")
        return res.status(400).json({
            message : "user not found"
        })
    }
    const {dataValues : profile} = profileObj; 
    return profile;
} 
module.exports = {get_profile_from_acc_id, get_all_allergies}
