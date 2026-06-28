let theme = true
let body = document.querySelector(".body")
function change() {
  if(theme){
    body.classList.add('dark')
    theme = false
  } else {
    body.classList.remove('dark')
    theme = true
  }
}