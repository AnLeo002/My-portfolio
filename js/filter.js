"use strict";

import {createProject} from './view.js';

const projects = JSON.parse(localStorage.getItem("listProjects"));
let fondo = document.querySelector(".desplegable");
  let list = document.querySelector(".lista");


const btnFilter = document.querySelector(".search");
const filter = document.querySelector(".filter");

btnFilter.addEventListener("click", () => {
  fondo.style.display = "flex";
  list.style.right = "0px";
  fondo.addEventListener("click", () => {
    fondo.style.display = "none";
    list.style.right = "-500px";
  });
});
function addElementsFilter() {
  const langs = JSON.parse(localStorage.getItem("listLang"));

  langs.forEach((lang) => {
    document.getElementById(
      "formLang"
    ).innerHTML += `<label class="direc"><input type="checkbox" class="checkbox" id=${lang.id} value="${lang.id}">${lang.language}</label>`;
  });
  projects.forEach((pro) => {
    createSelect(pro);
  });
  
}

addElementsFilter();
let arrSelectedBox = [];

document.querySelectorAll(".checkbox").forEach((check) => {
  
  check.addEventListener("change", (e) => {
    document.getElementById("formName").innerHTML="";
    document.getElementById("formDate").innerHTML="";
    if (e.target.checked == true) {
      arrSelectedBox.push(parseInt(e.target.value));
    }else {
      arrSelectedBox = deselectCheckbox(arrSelectedBox,parseInt(e.target.value)) 
    }
    selectionFilter(arrSelectedBox);
  });
});

function containArr(arrSelect, arrId) {
  if(arrId.length==1 && arrSelect.length==1){
    if(arrId.includes(arrSelect)){
      return true;
    } 
    return false;
  }else{
      return arrSelect.every((num) => arrId.includes(num));
  }
};

function deselectCheckbox(arr, num)  {
  return arr.filter(numero=>numero !== num);
}

function createSelect(project){ 
  const optionName = document.createElement("option");
  const optionDate = document.createElement("option");

  optionName.setAttribute("value",project.projectName);
  optionName.setAttribute("id",project.id);
  optionName.classList.add("searchSelec");
  optionName.textContent=project.projectName;

  optionDate.setAttribute("value",project.projectName);
  optionDate.setAttribute("id",project.id);
  optionName.classList.add("searchSelec");
  optionDate.textContent=`${project.date} / ${project.projectName}`;

  document.getElementById("formName").appendChild(optionName);
  document.getElementById("formDate").appendChild(optionDate);
}

function createSelectAll(){
  const optionName = document.createElement("option");
  const optionDate = document.createElement("option");

  optionName.setAttribute("value","all");
  optionName.textContent="Todos los proyectos";

  optionDate.setAttribute("value","all");
  optionDate.textContent="Todas las fechas";

  document.getElementById("formName").appendChild(optionName);
  document.getElementById("formDate").appendChild(optionDate);
}

function selectionFilter(array){
  const selectDate = document.getElementById("formDate");
  if(!array.length == 0){
    projects.forEach((pro) => {
      let idLang = [];
      pro.languages.forEach((lang) => {
        idLang.push(lang.id);
      });
      if (containArr(array, idLang)) {
        createSelect(pro);
      }
      if(selectDate.childElementCount > 1){
        createSelectAll();
      }
    });
  }else{
    createSelectAll();
    projects.forEach((pro) => {
      createSelect(pro);
    });
  }
}
document.querySelector(".buttonFilter").addEventListener("click",()=>{
  if(buttonSearch(arrSelectedBox)){
  fondo.style.display = "none";
  list.style.right = "-500px";
  }
});

function buttonSearch(array){
  const fragment = document.createDocumentFragment();
  const valDate = document.getElementById("formDate").value;
  const valName = document.getElementById("formName").value;
  const cardsProjects = document.querySelector(".cards");
  
  if(valDate != valName){
    document.querySelector(".alertFilter").textContent="No es posible generar una busqueda, por favor indique en los espacios el mismo valor";
    return false;
  }else{
    deleteChilds(cardsProjects);
    document.querySelector(".alertFilter").textContent="";
    if(valDate == "all" && array.length==0){
      projects.forEach(project => {
        const newPro = createProject(project);
        fragment.appendChild(newPro);
      });
    }else if(valDate == "all" && array.length>0){
      document.querySelectorAll(".searchSelec").forEach(selec =>{
        projects.forEach(pro=>{
          if(pro.projectName == selec.value){
            const newPro = createProject(pro);
            fragment.appendChild(newPro);
          }
        })
      })
    }
    else{
      projects.forEach(pro=>{
        if(pro.projectName == valName){
          const newPro = createProject(pro);
          fragment.appendChild(newPro);
        }
      })
    }
    cardsProjects.appendChild(fragment);
    return true;
  }
}

function deleteChilds(element){
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}