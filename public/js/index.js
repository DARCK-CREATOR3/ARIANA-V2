<<<<<<< HEAD
let theme = true
let body = document.querySelector(".body")
=======
const params = new URLSearchParams(window.location.search)
const id = params.get("id")
let theme = true
let chatbox = document.querySelector(".chatbox")
let body = document.querySelector(".body")
let button = document.getElementById("message-btn")
let discussionId = null
>>>>>>> ea772a4 (hha)
function change() {
  if(theme){
    body.classList.add('dark')
    theme = false
  } else {
    body.classList.remove('dark')
    theme = true
  }
<<<<<<< HEAD
}
=======
}
async function profil(){
  const res = await fetch(`/profil/${id}`,{
    credentials: "include"
  })
  const result = await res.json()
  console.log("c'est bon",result.data)
  document.querySelectorAll(".name-content").forEach(text => {
    text.textContent = result.data.name
  })
  document.querySelectorAll(".email-content").forEach(text => {
    text.textContent = result.data.email
  })
  console.log(result.data)
  if(res.ok) {
    alert("Okk ça passe",result.data)
  }
  else {
    alert("connexion impossible ")
  }
}
let text = document.getElementById('message')
async function discussion() {
  text.disabled=false
  button.disabled=false
  chatbox.innerHTML =` <div class="begin flex flex-col items-center justify-center h-[80vh] text-center px-6">
    <div class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-5 shadow-lg">
        <i class="bi bi-chat-dots text-4xl text-indigo-600">
        </i>
    </div>
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
        Bienvenue 👋
    </h2>

    <p class="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        Commencez une discussion avec votre assistant IA.
        Posez une question, demandez de l'aide ou lancez simplement la conversation.
        Clique sur <strong>COMMENCER</strong> ou appuyez sur le bouton <b>+</b> au dessus à droite pour voir la liste de discussion
        appuyez sur le <b><i class="bi bi-pencil-square"></i></b> pour une nouvelle discussion 
    </p>
</div>`
  try {
    const res = await fetch("/discussion",{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        userId: id
      })
    })
    const result = await res.json()
    discussionId = result.discussion.id
    console.log(result.discussion)
  }
  catch (error){
    console.log(error)
  }
}
async function sendMessage() {
    text.disabled = true;
    button.disabled = true;
    const heure = getTime()
    let begin = document.querySelector('.begin');
    if (begin) {
        begin.classList.add('hidden');
    }
    let message = text.value.trim();
    if (message === "") {
        text.disabled = false;
        button.disabled = false;
        return;
    }
    let divUser = document.createElement('div');
    divUser.className = "flex justify-end gap-2 my-2";
    divUser.innerHTML = `
        <div class="msg p-3 rounded-lg bg-gray-100  dark:bg-gray-800 dark:border-gray-500 max-w-[80%]">
            <p class="txt dark:text-gray-200 text-sm font-normal break-words">${escapeHtml(message)}</p>
            <div class="flex justify-end mt-1">
                <span class="text-xs text-gray-400">${heure}</span>
            </div>
        </div>
        <i class="bi bi-person-circle text-2xl text-gray-500 dark:text-gray-400"></i>
    `;
    chatbox.appendChild(divUser);
    let loading = document.createElement('div');
    loading.className = 'flex justify-start gap-2 my-2';
    loading.id = 'typing-indicator';
    loading.innerHTML = `
        <i class="bi bi-robot text-2xl text-gray-500 dark:text-gray-400"></i>
        <div class="text-sq border dark:border-gray-500 p-3">
            <div class="flex items-center gap-2">
                <div class="animate-pulse w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-50" style="animation-delay: 0s;"></div>
                <div class="animate-pulse w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-50" style="animation-delay: 0.4s;"></div>
                <div class="animate-pulse w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-50" style="animation-delay: 0.8s;"></div>
            </div>
        </div>
    `;
    chatbox.appendChild(loading);
    text.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
    const data = {
        userId: id,
        discussionId: discussionId,
        message: message
    };
    
    try {
        console.log("Message envoyé ");
        const res = await fetch("/chat", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        

        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        

        if (!res.ok) {
            throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }
        
        const result = await res.json();
        console.log(result);
        

        let divAi = document.createElement('div');
        divAi.className = 'flex justify-start gap-2 my-2';
        divAi.innerHTML = `
            <i class="bi bi-robot text-2xl text-gray-500 dark:text-gray-400"></i>
            <div class="msg p-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 dark:border-gray-500  max-w-[80%]">
                <p class="txt text-sm font-normal break-words">${escapeHtml(result.response|| result)}</p>
                <div class="flex justify-end mt-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">${timeShort(result.created_at)}</span>
                </div>
            </div>
        `;
        chatbox.appendChild(divAi);
        chatbox.scrollTop = chatbox.scrollHeight;

        text.disabled = false;
        button.disabled = false;
        text.focus();
        
    } catch (error) {
        console.error(`Erreur: ${error}`);
        
 
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        

        let divError = document.createElement('div');
        divError.className = 'flex justify-start gap-2 my-2';
        divError.innerHTML = `
            <i class="bi bi-robot text-2xl text-gray-500 dark:text-gray-400"></i>
            <div class="msg p-3 rounded-lg bg-red-50 dark:bg-red-800 text-red-600 dark:text-red-400  border-red-200 dark:border-red-800 max-w-[80%]">
                <div class="flex items-center gap-2">
                    <i class="bi bi-exclamation-triangle-fill text-red-500"></i>
                    <p class="txt text-sm font-normal break-words">${escapeHtml(`${error.message} =>  veuillez ouvrir une discussion avant d'envoyer le message ` || "Une erreur est survenue. Veuillez réessayer.")}</p>
                </div>
                <div class="flex justify-end mt-1">
                    <span class="text-xs text-red-400 dark:text-red-500">${getTime()}</span>
                </div>
            </div>
        `;
        chatbox.appendChild(divError);
        chatbox.scrollTop = chatbox.scrollHeight;

        text.disabled = false;
        button.disabled = false;
        text.focus();
    }
}
async function discussionsAll() {
  try{
    const discussionListC = document.querySelector(".list-search-2")
    console.log(discussionListC)
    const  discussionList = document.querySelector(".list-search-1")
    const res = await fetch(`/discussions/${id}`,{
      credentials: 'include'
    })
    const result = await res.json()
    console.log(result.discussions)
    const discussions  = result.discussions
    discussionListC.textContent = ''
    discussionList.textContent = ''
    discussions.forEach(discussion => {
      let div = document.createElement('div')
      div.addEventListener('click',() => {
        openDiscussion(discussion.id)
        })
      div.className = 'item p-2 px-2 flex justify-between items-center dark:border-gray-500 border-b gap-2'
      div.innerHTML=`
         <div class="item-info flex items-center justify-center gap-1 chat-text dark:text-gray-400">
          <i class="bi bi-chat-text"></i>
           <p class="text-xs overflow-hidden">${discussion.titre}</p>
         </div>
           <p class="small text-gray-500">Chats</p>
      `
      discussionListC.appendChild(div)
    })
    discussions.forEach(discussion => {
      let div = document.createElement('div')
       div.addEventListener('click',() => {
        openDiscussion(discussion.id)
        })
      div.className = 'item p-2 px-2 flex justify-between items-center dark:border-gray-500 border-b gap-2'
      div.innerHTML=`
         <div class="item-info flex items-center justify-center gap-1 chat-text dark:text-gray-400">
          <i class="bi bi-chat-text"></i>
           <p class="text-xs overflow-hidden">${discussion.titre}</p>
         </div>
           <p class="small text-gray-500">Chats</p>
      `
      discussionList.appendChild(div)
    })
  }
  catch(error){
    console.log(error)
  }
}
async function openDiscussion(disId){
  discussionId = disId
  chatbox.innerHTML = ''
  const loadingDiv = document.createElement('div')
  loadingDiv.className = 'flex justify-center items-center h-full min-h-[200px]'
  loadingDiv.id = 'loading-indicator'
  loadingDiv.innerHTML = `
    <div class="flex flex-col items-center gap-3">
      <div class="w-8 h-8 spin rounded-full animate-spin"></div>
      <p class="text-gray-400 text-sm">Chargement des messages...</p>
    </div>
  `
  chatbox.appendChild(loadingDiv)
  
  const messagesContainer = document.createElement('div')
  messagesContainer.id = 'messages-container'
  messagesContainer.style.display = 'none'
  chatbox.appendChild(messagesContainer)
  
  try {
    const res = await fetch(`/discussion/${disId}?userId=${id}`,{
      credentials: 'include'
    })
    const result = await res.json()
    console.log(result.messages)
    const messages = result.messages
 
    const loadingEl = document.getElementById('loading-indicator')
    if (loadingEl) loadingEl.remove()
  
    const container = document.getElementById('messages-container')
    container.style.display = 'block'
    container.innerHTML = '' 
    
    messages.forEach(message => {
      let div = document.createElement('div')
      if(message.role == "user"){
        div.className='flex justify-end gap-2 my-2'
        div.innerHTML=`
        <div class="msg p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-500 max-w-[80%]">
            <p class="txt dark:text-gray-200 text-sm font-normal break-words">${escapeHtml(message.content)}</p>
            <div class="flex justify-end mt-1">
                <span class="text-xs text-gray-400">${timeShort(message.created_at)}</span>
            </div>
        </div>
        <i class="bi bi-person-circle text-2xl text-gray-500 dark:text-gray-400"></i>
        `
      }
      else{
        div.className="flex justify-start gap-2 my-2"
        div.innerHTML=`
          <i class="bi bi-robot text-2xl text-gray-500 dark:text-gray-400"></i>
          <div class="msg p-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 dark:border-gray-500 max-w-[80%]">
              <p class="txt text-sm font-normal break-words">${escapeHtml(message.content)}</p>
              <div class="flex justify-end mt-1">
                  <span class="text-xs text-gray-500 dark:text-gray-400">${timeShort(message.created_at)}</span>
              </div>
          </div>
        `
      }
      container.appendChild(div)
    })
    
    chatbox.scrollTop = chatbox.scrollHeight;
    
  } catch (error){
    console.log(error)
    
    const loadingEl = document.getElementById('loading-indicator')
    if (loadingEl) loadingEl.remove()
    
    const container = document.getElementById('messages-container')
    container.style.display = 'block'
    container.innerHTML = `
      <div class="flex justify-center items-center py-10">
        <p class="text-red-500 text-sm">❌ Erreur lors du chargement des messages</p>
      </div>
    `
  }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
function timeShort(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  // Moins d'1 minute
  if (diffMins < 1) return 'À l\'instant'
  
  // Moins d'1 heure
  if (diffMins < 60) return `${diffMins}m`
  
  // Moins d'1 jour
  if (diffHours < 24) return `${diffHours}h`
  
  // Moins d'1 semaine
  if (diffDays < 7) return `${diffDays}j`
  
  // Plus d'une semaine → afficher la date
  const options = { day: '2-digit', month: 'short' }
  return date.toLocaleDateString('fr-FR', options)
}
function getTime() {
  const now = new Date();

  return now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}




window.addEventListener("DOMContentLoaded",() => {
  profil()
  discussionsAll()
})
>>>>>>> ea772a4 (hha)
