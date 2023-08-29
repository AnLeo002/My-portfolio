"use strict";
const btnFilter = document.querySelector(".search");
const filter = document.querySelector(".filter");
btnFilter.addEventListener("click", () => {
  filter.innerHTML = `
  <select name="topic" id="" class="filIn">
          <option value="select">Seleccionar</option>
          <option value="lenguage">Lenguaje de programacion</option>
          <option value="name">Nombre programa</option>
          <option value="date">Fecha</option>
        </select>
        <input type="text" class="filIn">
        <button type="submit" class="filterBtn"><img src="/img/lupa.png" alt="magnifying glass" class="btnImg" onmouseover="mouseOver()" onmouseout="mouseOut()"></button>`;
  filter.style.display = "flex";
  filter.style.animation = "aparecer 3s forwards";
});
btnFilter.addEventListener("dblclick", () => {
  filter.style.animation = "desaparecer 1s forwards";
});
const mouseOver = () => {
  const btn = document.querySelector(".btnImg");
  btn.setAttribute("src", "/img/lupa (1).png");
};
const mouseOut = () => {
  const btn = document.querySelector(".btnImg");
  btn.setAttribute("src", "/img/lupa.png");
};
