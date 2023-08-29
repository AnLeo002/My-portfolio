'use strict'
const btnView = document.querySelectorAll(".more");

btnView.forEach(btn =>{
  btn.addEventListener("click",(e)=>{
    console.log(e.target.parentNode)
    const respuesta = document.querySelector(".response")
    respuesta.style.display='flex';
    respuesta.style.animation='aparecer 1s forwards';

    document.querySelector(".box").innerHTML=`
    <article class="viewCard">
          <div>
            <img src="yo-removebg-preview.png" alt="">
          <div class="textCard">
            <h3>Name proyect</h3>
            <div class="lengCard">
              <p class="lengCardName">Java</p>
              <p class="lengCardName">HTML</p> 
              <p class="lengCardName">HTML</p>                        
            </div>
          </div>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, pariatur minus nam consequatur dolore eveniet recusandae veritatis. Iusto ex impedit, tempore libero id, unde vel pariatur similique alias cumque hic!</p>
          <div>
            <p>Date</p>
            <p>Repository</p>
          </div>
        </article>`
  
    respuesta.addEventListener('click',()=>{
      document.querySelector(".box").innerHTML=``;
    respuesta.style.display='none'})
    
  })
})

