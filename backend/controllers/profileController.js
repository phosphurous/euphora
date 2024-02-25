const Profile = require('../models/profile');
const Ingredient = require('../models/ingredient');
const { Allergy } = require('../models/joinTables');
const Alias = require('../models/alias')
const Routine = require('../models/routine');

// not really useful more for testing
const get_profile_from_id = async(req, res) => {
    prof_id = validate_user_id_in_params(req, res);
    try {
        const profile = await getProfile(req, res, prof_id);
        res.status(200)
        res.json({
            ...profile
        })
        return;
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({error: error})
        return;
    }
}

const get_all_allergies = async(req,res) => {
    const prof_id = validate_user_id_in_params(req,res);
    try {
        const profile = await getProfile(req, res, prof_id);
        const { profile_id } = profile;
        const ingredient_profile_obj = await Ingredient.findAll({ 
            include : [{
                model : Profile, 
                through : Allergy,
                attributes : [],
                where : {profile_id : profile_id}
            },{
                model : Alias,
                attributes : ['alias_name'],
            }] 
        })
        console.log(ingredient_profile_obj)
        res.status(200).json(...ingredient_profile_obj)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

const get_all_routines = async(req,res) => {
    const prof_id = validate_user_id_in_params(req,res);
    try {
        const profile = await getProfile(req, res, prof_id);
        const { profile_id } = profile;
        const routines = await Routine.findAll({
            where : {
                profile_id : profile_id
            }
        })
        console.log("hello_routines: ", routines)
        res.status(200).json(routines);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

// create a get routines filter by date function like specify as params ?start_date="", end_date=""



// helper methods

const validate_user_id_in_params = (req, res) => {
    const prof_id = req.params.id
    if(prof_id === undefined){
        res.status(400)
        res.json({
            message : "invalid profile id"
        })
        return;
    }
    return prof_id;
}

const getProfile = async(req, res, profile_id) => {
    const profileObj = await Profile.findOne({
        where : {
            profile_id: profile_id,
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
module.exports = {get_profile_from_id, get_all_allergies, get_all_routines}
