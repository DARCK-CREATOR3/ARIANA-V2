const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs")
const supabase = require("./supabase");
<<<<<<< HEAD

=======
const OpenAi = require("openai")
const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY
})
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
>>>>>>> ea772a4 (hha)
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
<<<<<<< HEAD
=======
    console.log(authError)
>>>>>>> ea772a4 (hha)
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
<<<<<<< HEAD
    .select();


  if (error) {
=======
    .select()


  if (error) {
    console.log(error)
>>>>>>> ea772a4 (hha)
    return res.status(400).json({
      error: error.message
    });
  }
<<<<<<< HEAD


  res.json({
    user: data
  });

});






=======
  console.log("data:",data)
  res.status(200).json({
    data: data
  });

});
app.post("/login", async (req,res) => {
  try{
  const {email,password } = req.body
  console.log(req.body)
  const { data, error} = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error){
    console.log(error.message)
    return res.status(400).json({
      message: error.messagee
    })
  }
  res.json({
    message: "Connexion réussie ✅",
    data: data.user,
    session: data.session
  })
  }
  catch (error){
    console.log(error)
  }
})
app.get("/utilisateurs", async (req, res) => {

  const { data, error } = await supabase
    .from("utilisateurs")
    .select("*");


  if (error) {
    return res.status(400).json({
      message: error.message
    });
  }


  res.json(data);

});
app.get("/profil/:id",async (req,res) => {
  const { id } = req.params
  console.log(id)
  const { data, error} = await supabase
  .from("utilisateurs")
  .select("*")
  .eq("id",id)
  .single()
  
  if(error){
    console.log(error.message)
    return res.status(401).json({
      message: error.message
    })
  }
  console.log(data)
  res.json({
    data
  })
})
app.get("/me", async (req,res) => {
  const token = req.headers.authorization?.replace("Bearer","")
  if(!token){
    console.log("Pas de token ❌")
      return res.status(401).json({
        message: "Pas de token ❌"
      })
  }
  const {data:userData, error:userError} = await supabase.auth.getUser(token)
  if(userError){
    console.log('Token invalide ❌')
    return res.status(401).json({
      message: "Token invalide"
    })
  }
  const {data: profil, error} = await supabas
  .from("utilisateurs")
  .select("*")
  .eq("id",userData.user.id)
  .single()
  if(error){
    console.log(error.message)
    res.status(404).json({
      message: error.message
    })
  }
  res.json(profil)
})
app.post("/discussion", async (req,res) => {
  try{
  const { userId } = req.body
  const { data, error } = await supabase
  .from('discussions')
  .insert({
    user_id: userId,
    titre: "Nouvelle discussion"
  })
  .select()
  .single();
  if(error){
    console.log(error.message || "Erreur dans if")
    return res.status(400).json({
      message: error.message
    })
  }
  res.status(201).json({
    discussion: data
  })
  }
  catch (error){
    console.log('Erreur de connexion')
  }
})
app.post("/chat", async (req, res) => {
  try {
    const { userId, discussionId, message } = req.body;

    if (!userId || !discussionId || !message) {
      return res.status(400).json({
        message: "Informations manquantes"
      });
    }

    const { data: discussion, error: discussionError } = await supabase
      .from("discussions")
      .select("*")
      .eq("id", discussionId)
      .eq("user_id", userId)
      .single();

    if (discussionError) {
      return res.status(404).json({
        message: "Discussion introuvable"
      });
    }
    const { error: userMessageError } = await supabase
      .from("message")
      .insert({
        user_id: userId,
        discussion_id: discussionId,
        role: "user",
        content: message
      })
      .select()
      .single();

    if (userMessageError) {
      return res.status(400).json({
        message: userMessageError.message
      });
    }

    const { data: messages, error: historyError } = await supabase
      .from("message")
      .select("role, content")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: true });

    if (historyError) {
      return res.status(400).json({
        message: historyError.message
      });
    }

    const history = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: history.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }))
});

const aiResponse = response.text;
 const {data: aiMessage,error: aiMessageError } = await supabase
      .from("message")
      .insert({
        user_id: userId,
        discussion_id: discussionId,
        role: "assistant",
        content: aiResponse
      })
      .select()
      .single();

    if (aiMessageError) {
      return res.status(400).json({
        message: aiMessageError.message
      });
    }
    console.log(aiResponse)
    res.status(200).json({
      response: aiResponse,
      created_at: aiMessage.created_at
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: error.message
    });
  }
});
app.get('/discussions/:userId', async (req,res) => {
  const { userId } = req.params
  const { data, error } = await supabase
  .from('discussions')
  .select('*')
  .eq('user_id',userId)
  .order('created_at',{
    ascending: false
  });
  if(error) {
    console.log(error.message)
    return res.status(400).json({message: error.message})
  }
  res.status(200).json({
    discussions: data
  })
})
app.get("/discussion/:discussionId", async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { userId } = req.query; // important pour sécurité

    if (!discussionId || !userId) {
      return res.status(400).json({
        message: "Paramètres manquants"
      });
    }
    const { data: discussion, error: discussionError } = await supabase
      .from("discussions")
      .select("*")
      .eq("id", discussionId)
      .eq("user_id", userId)
      .single();

    if (discussionError) {
      return res.status(404).json({
        message: "Discussion introuvable"
      });
    }
    const { data: messages, error: messagesError } = await supabase
      .from("message")
      .select("*")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: true });

    if (messagesError) {
      return res.status(400).json({
        message: messagesError.message
      });
    }

    res.status(200).json({
      discussion,
      messages
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});
>>>>>>> ea772a4 (hha)


app.listen(3000, () => {
  console.log("Serveur lancé sur le port 3000");
});