import "./index.css";

// ***Реализация эффекта ластика в хедере***

const header = document.querySelector(".header");
const headerButton = document.querySelector(".header__button");
const headerNavbar = document.querySelector(".header__navbar");
const eraserContainer = document.querySelector(".eraserContainer");
// console.log(headerNavbar);
header.addEventListener("mousemove", (e) => {
  if (e.target === headerButton || e.target === headerNavbar) return;
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

//***Реализация смены значений в секции "В роли наставника вы будете..."***
const spanToSwitch = document.querySelector(".resp__introSwitch");
const spanValues = [
  "программировании",
  "дизайне",
  "анализе данных",
  "маркетинге",
  "менеджменте",
];
const getRandomValue = () => {
  const randomIndex = Math.floor(Math.random() * spanValues.length);
  return spanValues[randomIndex];
};
setInterval(() => {
  spanToSwitch.classList.add("resp__introSwitch_transitionMode");
  spanToSwitch.textContent = getRandomValue();
  spanToSwitch.classList.remove("resp__introSwitch_transitionMode");
}, 2000);

// ***Реализация появления сообщений при скролле

const anchor = document.querySelector(".mentorVSreviewer__quoteTitle");

document.addEventListener("scroll", (e) =>
  console.log(anchor.getBoundingClientRect())
);

// ===== stories =======

// ======= slider gallari ======
const leftBtn = document.querySelector(".nav__btn_left");
const rightBtn = document.querySelector(".nav__btn_right");
const galleries = document.querySelector(".galleries");
const stories = document.querySelector(".stories");
const gallery = document.querySelector(".gallery");

//количество слайдов
const slidesCount = galleries.querySelectorAll(".gall").length;

//активный стайд
let activeSliderIndex = 0;

leftBtn.addEventListener("click", () => {
  changeSlide("left");
});

//слушатель на кнопку вправо
rightBtn.addEventListener("click", () => {
  changeSlide("right");
});

function changeSlide(direction) {
  if (direction === "right") {
    activeSliderIndex >= 1 ? false : activeSliderIndex++;
    console.log(activeSliderIndex);
    if (activeSliderIndex === slidesCount) {
      activeSliderIndex = 0;
    }
  } else if (direction === "left") {
    activeSliderIndex <= 0 ? false : activeSliderIndex--;
    console.log(activeSliderIndex);
    if (activeSliderIndex < 0) {
      activeSliderIndex = slidesCount - 1;
    }
  }
  const width = stories.clientWidth;
  galleries.style.transform = `translateX(-${
    activeSliderIndex * width * 0.929
  }px)`;
}
