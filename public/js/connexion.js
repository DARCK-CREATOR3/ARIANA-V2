window.addEventListener("load",function () {
  document.getElementById("loader").style.display="none"
})



let couleur = "dark"
let form = document.getElementById("formulaire")
  function change(){
    const body = document.querySelector(".body")
    if (couleur == "dark") {
      body.classList.add("dark")
      body.classList.remove("light")
      couleur = "light"
    } else {
      body.classList.add("light")
      body.classList.remove("dark")
      couleur = "dark"
    }
  }
  let pP= "password"
  function pwd() {
    const pPwd = document.getElementById("password")
    const icon = document.getElementById("ipwd")
    if (pP == "password") {
      icon.classList.add("bi-eye-slash")
      icon.classList.remove("bi-eye")
      pPwd.type = "password"
      pP= "text"
    } else if (pP == "text") {
      icon.classList.add("bi-eye")
      icon.classList.remove("bi-eye-slash")
      pPwd.type = "text"
      pP= "password"
    }
  }
  let formulaire = document.getElementById("formulaire")
  formulaire.addEventListener("submit", async function (e) {
    e.preventDefault()
    const formData = new FormData(formulaire)
    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    try {
      const res = await fetch('/login',{
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      const result = await res.json()
      const userId = result.data.id
      if(res.ok){
        alert('okk')
        window.location.href=`chatbot.html?id=${userId}`
      }
      else {
        alert("Une erreur tsss")
      }
    }
    catch (error) {
      alert("Une erreur serveur")
    }
  })
  
  
  
  
window.addEventListener("DOMContentLoaded", () => {
  pwd()
})