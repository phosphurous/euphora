const Product = require("../models/product");
const Profile = require("../models/profile");
const Review = require("../models/review");
const { Op } = require('sequelize');

//This is for user to add into the Routine
const getAllProducts = async (req, res) => {
  // const account = req.account;
  try {
    const allProducts = await Product.findAll({ raw: true });
    return res.status(200).json({ message: "Successfully retrieved all Products.", allProducts });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

const getProductBySearch = async (req, res) => {
  const search_query = req.query.q;

  try {
    const results = await Product.findAll({
      attributes: ['product_id', 'name'],
      where: {
        name: {
          [Op.iLike]: `%${search_query}%`
        }
      },
      limit: 10
    });

    // const productNames = results.map(product => product.name);

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
        return res.status(400).json({ message: "Error. Fields are empty." });
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

      return res.status(201).json({ message: "Successfully created a product." });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  }

  const deleteProduct = async (req, res) => {
    const productID = req.params.id;

    try {
      await Product.destroy(
        {
          where: { product_id: productID }
        });

      return res.status(201).json({ message: "Successfully deleted a product." });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  }

  const getReviewsBySkinCondition = async (req, res) => {
    const productID = req.params.id;
    const { condition } = req.body;
    try {
      const reviews = await Review.findAll({
        include: [{
          model: Profile,
          where: { condition: condition }
        }, {
          model: Product,
          where: { product_id: productID }
        }]
      });

      return res.status(200).json({ message: "Successfully retrieved reviews.", data: reviews });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  }

  module.exports = { getAllProducts, addProduct, deleteProduct, getReviewsBySkinCondition, getProductBySearch };