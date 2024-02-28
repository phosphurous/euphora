const Account = require("../models/account");
const User = require('../models/user');
const UserSkill = require('../models/userSkill');

const updateUser = async (req, res) => {
    const account = req.account;

    try {
        //Filtering out each Object so that they == to the email.

        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => value === req.user.email));
        // const filteredJsonString = JSON.stringify(filteredObject); // Stringify the filtered object   
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }     
      
        // const getUserID = req.params.id;
        const getUserObj = await User.findOne({ where: { account_id : account.account_id }, raw: true });

        //Ensure that the current user is authorised to update details
        // if (account.account_id !== getUserObj.account_id) {
        //   return res.status(403).json({ message: "Not authorised!" });
        // }

        const email = req.body.email;
        const name = req.body.name;
        const contact = req.body.contact_no;

        const teleUsername = req.body.telegram_username;

        await Account.update(
          { email: email, name: name, contact_no: contact },
          { where: { account_id: getUserObj.account_id }} );

        const updatedAcc = await Account.findOne({ where: { account_id: getUserObj.account_id }, raw: true });
        const accessToken = await updateJWT(updatedAcc);

        await User.update(
          { telegram_username: teleUsername },
          { where: { account_id : account.account_id }} );

        return res.status(200).json({ message: "Successfully updated for all tables.", accessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne(
        { where: { user_id: id }, 
        include: [
          {
            model: Account,
            attributes: {
              exclude: ['password', 'account_id', 'json_tokenID'], // Exclude the 'password','json_tokenID' and 'account_id' field from the Account model
            },
          }
        ], raw: true });

      console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      }

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
}

const addSkill = async (req, res) => {
  const id = req.params.id;
  const { skills } = req.body;

  try {
    const user = await User.findOne({ where: { user_id: id }, raw: true });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const data = skills.map(skill => {
      return { skill_id: skill, user_id: id };
    })
  
    const result = await UserSkill.bulkCreate(data, { raw: true });
  
    if (result) {
      return res.status(201).json({ message: "Successfully added user skills!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Failed to add user skills!" });
  }
}
const deleteOrgReview = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;

    const deletedRow = await OrganiserReview.destroy(
      { where: { organiser_review_id: reviewID } });


    return res.status(200).json({ message: "Organiser review has been successfully deleted." })

  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
module.exports = { updateUser, getUser, addSkill, deleteOrgReview };