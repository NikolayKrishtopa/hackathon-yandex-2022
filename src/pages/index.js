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

// ***===== stories =======

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
  console.log("left");
  changeSlide("left");
});

//слушатель на кнопку вправо
rightBtn.addEventListener("click", () => {
  console.log("right");
  changeSlide("right");
});

function changeSlide(direction) {
  if (direction === "right") {
    activeSliderIndex++;
    console.log(activeSliderIndex);
    if (activeSliderIndex === slidesCount) {
      activeSliderIndex = 0;
    }
  } else if (direction === "left") {
    activeSliderIndex--;
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
// ===== конец блока stories =======

// ***============= questions ====================

const spollerArray = document.querySelectorAll("[data-spollers]");
if (spollerArray.length > 0) {
  // Получение обычных споллеров
  const spollerRegulare = Array.from(spollerArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(",")[0];
  });
  // Инициализация обычных споллеров
  if (spollerRegulare.length > 0) {
    initSpollers(spollerRegulare);
  }
}

// Инициализация

// matchMedia добавлен для будущего, если будет введено появление
// споллера в зависимости от размера экрана
function initSpollers(spollerArray, matchMedia = false) {
  spollerArray.forEach((spollersBlock) => {
    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
    if (matchMedia.matches || !matchMedia) {
      spollersBlock.classList.add("_init");
      initSpollerBody(spollersBlock);
      spollersBlock.addEventListener("click", setSpollerAction);
    } else {
      spollersBlock.classList.remove("._init");
      initSpollerBody(spollersBlock, false);
      spollersBlock.removeentListener("click", setSpollerAction);
    }
  });
}

// Работа с контентом
function initSpollerBody(spollersBlock, hidaSpollerBody = true) {
  const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
  if (spollerTitles.length > 0) {
    spollerTitles.forEach((spollerTitle) => {
      if (hidaSpollerBody) {
        spollerTitle.removeAttribute("tabindex");
        if (!spollerTitle.classList.contains("_active")) {
          spollerTitle.nextElementSibling.hidden = true;
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      }
    });
  }
}

function setSpollerAction(e) {
  const el = e.target;
  if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
    const spollerTitle = el.hasAttribute("data-spoller")
      ? el
      : el.closest("[data-spoller]");
    const spollerBlock = spollerTitle.closest("[data-spoller]");
    const oneSpoller = spollerBlock.hasAttribute("[data-one-spoller]")
      ? true
      : false;
    if (!spollerBlock.querySelectorAll("._slide").length) {
      if (oneSpoller & !spollerTitle.classList.contains("_active")) {
        hidaSpollerBody();
      }
      spollerTitle.classList.toggle("_active");
      _slideToggla(spollerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
}

function hidaSpollerBody(spollerBlock) {
  const spollerActiveTitle = spollerBlock.querySelector(
    "[data-spoller]._active"
  );
  if (spollerActiveTitle) {
    spollerActiveTitle.classList.remove("_active");
    _slideUp(spollerActiveTitle.nextElementSibling, 500);
  }
}

let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("heaght");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};

let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("heaght");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};

let _slideToggla = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
