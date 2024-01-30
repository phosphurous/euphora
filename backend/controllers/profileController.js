const Profile = require('../models/profile');

const getProfile = async(req, res) => {
    const acc_id = req.params.id
    if(acc_id === undefined){
        return res.status(400).json({
            message : "invalid user id"
        })
    }
    try {
        const profileObj = await Profile.findOne({
            where : {
                account_id: acc_id,
            }
        })
        if (profileObj === null){
            return res.status(400).json({
                message : "user not found"
            })
        }
        const {dataValues : profile} = profileObj; 
        return res.status(200).json({
            ...profile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}



module.exports = {getProfile}