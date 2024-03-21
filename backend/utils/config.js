
require('dotenv').config();

const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

const DB_URL = process.env.DATABASE_URL

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
module.exports = {
  PORT, API_VER, DB_URL, 
  SUPABASE_URL,SUPABASE_PUBLIC_KEY, GEMINI_API_KEY
};