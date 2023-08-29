'use strict'
const form = document.getElementById("form");

async function hadleSendEmail(e){
  e.preventDefault();

  const fd = new FormData(this);
  
  const response = await fetch("https://formspree.io/f/mqkvqvqa",{
    method:'POST',
    body:fd,
    headers:{
      Accept: 'aplication/json'
    }
  })
   
  const respuesta = document.querySelector(".response")
  respuesta.style.display='flex';
  respuesta.style.animation='aparecer 1s forwards';
  respuesta.addEventListener('click',()=>{
  respuesta.style.display='none'})


  const message = document.createElement('h3');
  message.setAttribute("class","message");

  if(response.ok){
    this.reset();
    message.textContent="Mensaje enviado correctamente";
  }else{
    message.textContent="Error al enviar el mensaje";
  }
  document.querySelector(".box").appendChild(message);

}
form.addEventListener('submit', hadleSendEmail);