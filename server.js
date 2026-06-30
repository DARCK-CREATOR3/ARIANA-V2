const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs")
const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email,
      password
    });


  if (authError) {
    return res.status(400).json({
      error: authError.message
    });
  }


  const { data, error } = await supabase
    .from("utilisateurs")
    .insert({
      id: authData.user.id,
      name,
      email
    })
    .select();


  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }


  res.json({
    user: data
  });

});








app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});