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

window.addEventListener("DOMContentLoaded", () => {
  change()
  pwd()
})