const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database')

const Profile = sequelize.define(
    "Profile", {
        profile_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        condition : {
            type : DataTypes.ARRAY(DataTypes.STRING),
            allowNull : true,
        },
        skin_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
      timestamps: false,
      tableName: "profile"
    }
)

module.exports = Profile;