// let io=require('socket.io');
const socket=io();
console.log("you are on client side")
let name
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area');

do{
  name=prompt("please enter your name");
}while(!name);

textarea.addEventListener('keyup',(e)=>{
  if(e.key==='Enter'){
    sendMessage(e.target.value);
  }
})

function sendMessage(message){
  let msg={
    username:name,
    message:message.trim()
  }
  appendMessage(msg,'outgoing');
  textarea.value='';
  scrollToBottom();
  
  // socket code or emitting on server
  socket.emit('message',msg);
  
}

 function appendMessage(msg,type){
   let mainDiv=document.createElement('div');
   let className=type;
   mainDiv.classList.add(className,'message');
   
   let markup=`
   <h4>${msg.username}</h4>
   <p>${msg.message}</p>
   `
   
   mainDiv.innerHTML=markup;
   messageArea.appendChild(mainDiv);
   
 }
// recieved message

socket.on('message',(msg)=>{
  
  appendMessage(msg,'incoming');
  scrollToBottom()
})

//to scroll when new item added
function scrollToBottom(){
  messageArea.scrollTop=messageArea.scrollHeight;
}
