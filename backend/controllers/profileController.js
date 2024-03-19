const Profile = require('../models/profile');
const Ingredient = require('../models/ingredient');
const { Allergy } = require('../models/joinTables');
const Alias = require('../models/alias')
const Routine = require('../models/routine');

// not really useful more for testing
const get_profile_from_id = async (req, res) => {
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
        res.json({ error: error })
        return;
    }
}

const get_all_allergies = async (req, res) => {
    const prof_id = validate_user_id_in_params(req, res);
    try {
        const profile = await getProfile(req, res, prof_id);
        const { profile_id } = profile;
        const ingredient_profile_obj = await Ingredient.findAll({
            include: [{
                model: Profile,
                through: Allergy,
                attributes: [],
                where: { profile_id: profile_id }
            }, {
                model: Alias,
                attributes: ['alias_name'],
            }]
        })
        console.log(ingredient_profile_obj)
        res.status(200).json(...ingredient_profile_obj)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const get_all_routines = async (req, res) => {
    const prof_id = validate_user_id_in_params(req, res);
    try {
        const profile = await getProfile(req, res, prof_id);
        const { profile_id } = profile;
        const routines = await Routine.findAll({
            where: {
                profile_id: profile_id
            }
        })
        console.log("hello_routines: ", routines)
        res.status(200).json(routines);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

// create a get routines filter by date function like specify as params ?start_date="", end_date=""



// helper methods

const validate_user_id_in_params = (req, res) => {
    const prof_id = req.params.id
    if (prof_id === undefined) {
        res.status(400)
        res.json({
            message: "invalid profile id"
        })
        return;
    }
    return prof_id;
}

const getProfile = async (req, res, profile_id) => {
    const profileObj = await Profile.findOne({
        where: {
            profile_id: profile_id,
        }
    })
    if (profileObj === null) {
        console.log("user not found")
        return res.status(400).json({
            message: "user not found"
        })
    }
    const { dataValues: profile } = profileObj;
    return profile;
}

//ENUM FOR SKIN TYPES
const skin_types = {
    DRY: 'DRY',
    OILY: 'OILY',
    COMBINATION: 'COMBINATION'
};

//ENUM FOR SKIN CONDIITONS
const skin_conditions = {
    ECZEMA: 'ECZEMA',
    SENSITIVE: 'SENSITIVE',
    ACNE: 'ACNE',
    REDNESS: 'REDNESS',
    SKIN_IRRITATION: 'SKIN IRRITATION',
    DARK_EYE_CIRCLES: 'DARK EYE CIRCLES',
    PSORIASIS: 'PSORIASIS',
    ROSACEA: 'ROSACEA',
    CONTACT_DERMATITIS: 'CONTACT DERMATITIS',
    SEBORRHEIC_DERMATITIS: 'SEBORRHEIC DERMATITIS', 
    RINGWORM: 'RINGWORM (TINEA CORPORIS)',
    IMPETIGO: 'IMPETIGO',
    CELLULITIS: 'CELLULITIS',
    VITILIGO: 'VITILIGO',
    LUPUS_ERYTHEMATOSUS: 'LUPUS ERYTHEMATOSUS',
    SCLERODERMA: 'SCLERODERMA',
    HIDRADENITIS_SUPPURATIVA: 'HIDRADENITIS SUPPURATIVA',
    PEMPHIGUS_PEMPHIGOID: 'PEMPHIGUS/PEMPHIGOID',
    ICHTHYOSIS: 'ICHTHYOSIS',
    NEUROFIBROMATOSIS: 'NEUROFIBROMATOSIS',
    ALBINISM: 'ALBINISM'
};

const get_skin_types_cond = async (req, res) => {
    try {
        const skin_types_conditions = {
            skin_types_option: Object.values(skin_types),
            skin_conditions_option: Object.values(skin_conditions)
        };
        return res.status(200).json({ message: "Retrieved Types and Conditions.", skin_types_conditions });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const add_profile = async(req, res) => {
    try {

        const prof_condition = req.body.skin_cond;
        const prof_type = req.body.skin_type;
        const account_id = req.body.account_id;

        await Profile.create({ condition: prof_condition, skin_type: prof_type, account_id: account_id });

        return res.status(201).json({ message: "Profile created successfully"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const update_skin_type_condition = async(req, res) => {
    try {

        const prof_condition = req.body.skin_cond;
        const prof_type = req.body.skin_type;
        const profile_id = req.body.profile_id;

        await Profile.update({ condition: prof_condition, skin_type: prof_type },
            { where: { profile_id : profile_id }} );

        return res.status(201).json({ message: "Profile updated successfully"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

module.exports = { get_profile_from_id, get_all_allergies, get_all_routines, 
    get_skin_types_cond, add_profile, update_skin_type_condition }
