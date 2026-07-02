window.addEventListener("load", () => {
    const loader = document.getElementById("load")
    loader.style.display = "none";
});

let couleur = "dark";
function change() {
    const body = document.querySelector(".body");
    if (couleur == "dark") {
        body.classList.add("dark");
        body.classList.remove("light");
        couleur = "light";
    } else {
        body.classList.add("light");
        body.classList.remove("dark");
        couleur = "dark";
    }
}
let pP = "password";
function pwd() {
    const pPwd = document.getElementById("password");
    const icon = document.getElementById("ipwd");
    if (pP == "password") {
        icon.classList.add("bi-eye-slash");
        icon.classList.remove("bi-eye");
        pPwd.type = "password";
        pP = "text";
    } else if (pP == "text") {
        icon.classList.add("bi-eye");
        icon.classList.remove("bi-eye-slash");
        pPwd.type = "text";
        pP = "password";
    }
}
<<<<<<< HEAD
let formulaire = document.getElementById("formulaire")
formulaire.addEventListener("submit",async function (e) {
  e.preventDefault()
  try {
=======
let form = document.getElementById("formulaire")

form.addEventListener("submit",async function (e) {
  e.preventDefault()
>>>>>>> ea772a4 (hha)
    let formData = new FormData(formulaire)
    const data = {
      name : formData.get('name'),
      email : formData.get('email'),
      password : formData.get('password')
    }
    if(data.password.length < 6){
  alert("Le mot de passe doit avoir au moins 6 caractères");
  return;
}
<<<<<<< HEAD
=======
  try {
>>>>>>> ea772a4 (hha)
    const res = await fetch('/register',{
      method: "POST",
      headers:{
       'Content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    const result = await res.json()
<<<<<<< HEAD
    if(res.ok){
      alert(result)
      alert(result,result.user.name)
      window.location.href="chatbot.html"
=======
    alert("pas",result.data)
    const userId = result.data[0].id
    if(res.ok){
      alert(result)
      window.location.href=`chatbot.html?id=${userId}`
>>>>>>> ea772a4 (hha)
      formulaire.reset()
    }
    else {
      alert("Y a une erreur ❌")
      formulaire.reset()
    }
  }
  catch (error) {
    alert("Erreur d'envoi")
  }
})








window.addEventListener("DOMContentLoaded", () => {
    pwd();
});
