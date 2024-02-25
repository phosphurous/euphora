require('dotenv').config();

const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

const DB_URL = process.env.DATABASE_URL

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const EXPIRY = process.env.EXPIRY

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY;

module.exports = {
  PORT, API_VER, DB_URL, 
  ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, 
  EXPIRY, SUPABASE_URL,SUPABASE_PUBLIC_KEY
};