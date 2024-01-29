require('dotenv').config();

const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

const DB_URL = process.env.DATABASE_URL

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const EXPIRY = process.env.EXPIRY

const UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET
const UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID

module.exports = {
  PORT, API_VER, DB_URL, UPLOADTHING_APP_ID, UPLOADTHING_SECRET,
  ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EXPIRY
};