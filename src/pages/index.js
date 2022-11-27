import './index.css'

const header = document.querySelector('.header')
const headerButton = document.querySelector('.header__button')
const headerNavbar = document.querySelector('.header__navbar')
const eraserContainer = document.querySelector('.eraserContainer')

header.addEventListener("mousemove", e => {
  if (e.target === headerButton || e.target === headerNavbar) return
  const eraser = document.createElement("span");
  eraser.style.left = -50 + e.offsetX + "px";
  eraser.style.top = -50 + e.offsetY + "px";
  eraserContainer.appendChild(eraser);
});


// *** Надо подумать как реализовать отслеживание касания***

// header.addEventListener("", e => {
//   if (e.target === headerButton || e.target === headerNavbar) return
//   const eraser = document.createElement("span");
//   eraser.style.left = -50 + e.offsetX + "px";
//   eraser.style.top = -50 + e.offsetY + "px";
//   eraserContainer.appendChild(eraser);
// });