"use strict";
const cardsProjects = document.querySelector(".cards");

window.addEventListener("load", () => {
   /* fetch("http://localhost:8080/select/all")
    .then(res=> res.text())
    .then(res=>sessionStorage.setItem("listProjects",res)); 
    fetch("http://localhost:8080/select/all/lang")
    .then(res=> res.text())
    .then(res=>localStorage.setItem("listLang",res)); */
    const infoLocal = JSON.parse(localStorage.getItem("listProjects"));
    const fragment = document.createDocumentFragment();
    infoLocal.forEach(project => {
      const newPro = createProject(project);
      fragment.appendChild(newPro);
    });
    cardsProjects.appendChild(fragment);
  
}); 

export function createProject (project) {
    const card = document.createElement("article");
    const img = document.createElement("IMG");
    const h3 = document.createElement("H3");
    const ul = document.createElement("ul");
    const button = document.createElement("button");

    card.classList.add("card");
    card.setAttribute("id", project.id);

    img.setAttribute("src", "/hola.jpeg");
    img.setAttribute("alt", "img-project");

    h3.classList.add("namePro");
    h3.textContent = project.projectName;

    ul.classList.add("lengCard");
    project.languages.forEach((lang) => {
      const li = document.createElement("li");
      li.classList.add("lengCardName");
      li.textContent = lang.language;
      ul.appendChild(li);
    });

    button.classList.add("more");
    button.classList.add("search");
    button.textContent = "Ver más";
    button.addEventListener("click", (e) => {
      const respuesta = document.querySelector(".response");
      respuesta.style.display = "flex";
      respuesta.style.animation = "aparecer 1s forwards";

      document.querySelector(".box").innerHTML = `
      <article class="viewCard">
            <img src="/img/DS.png" alt="">  
            <div class="textCard">
                <h3 id="textTitle">${project.projectName}</h3>
                <ul class="listLang"></ul>
              <p>${project.description}</p>
              <p>Date: ${project.date}</p>
              <a href="${project.url}" target="_blank">${project.url}</a>
            </div>
          </article>`;
          project.languages.forEach( lang => {
            document.querySelector(".listLang").innerHTML+=`
            <li class="lengCardName">${lang.language}</li>
            `
          });
      

      respuesta.addEventListener("click", () => {
        document.querySelector(".box").innerHTML = ``;
        respuesta.style.display = "none";
      });
    });

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(ul);
    card.appendChild(button);

    return card;
};
