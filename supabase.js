const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
<<<<<<< HEAD
  process.env.SUPABASE_KEY
=======
  process.env.SUPABASE_KEY_SECRET
>>>>>>> ea772a4 (hha)
);

module.exports = supabase;