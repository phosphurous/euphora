const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const Account = sequelize.define(
    "Account",
    {
        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false
        },
    },
    {
      timestamps: false,
      tableName: "account"
    }
);

module.exports = Account;