import "./index.css";
import scrollSelectors from "../utils/config";
import MentorReviewer from "../blocks/components/MentorReviewer";

// ***Реализация эффекта ластика в хедере***
// Вариант черновой, отрефакторить на Canvas

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

const mentorReviewer = new MentorReviewer(scrollSelectors);
mentorReviewer.initialize();

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
        spollersBlock.classList.remove("_init");
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }

  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute("tabindex");
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
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
        hideSpollerBody();
      }
      spollerTitle.classList.toggle("_active");
      _slideToggla(spollerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
}

function hideSpollerBody(spollerBlock) {
  const spollerActiveTitle = spollerBlock.querySelector(
    "[data-spoller]._active"
  );
  if (spollerActiveTitle) {
    spollerActiveTitle.classList.remove("_active");
    _slideUp(spollerActiveTitle.nextElementSibling, 500);
  }
}

// =============  функции анимации  ==============
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
      target.style.removeProperty("height");
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
    target.style.marginBottom = 20;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("heaiht");
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

// ==========  quiz ============

// блок первой карточки
const firstCard = document.querySelector(".quiz__card-first");
const buttonFirstCardBtn = document
  .querySelector(".quiz__card-first")
  .querySelectorAll(".card__button");

// блок второй карточки
const secondCardClose = document.querySelector(
  ".quiz__card-second.quiz__card-close"
);
const secondCardOpen = document.querySelector(".quiz__card-second");
const buttonSecondCardBtn = document
  .querySelector(".quiz__card-second")
  .querySelectorAll(".card__button");

// блок третьей карточки
const thirdCardClose = document.querySelector(
  ".quiz__card-third.quiz__card-close"
);
const thirdCardOpen = document.querySelector(".quiz__card-third");
const buttonThirdCard = document
  .querySelector(".quiz__card-third")
  .querySelectorAll(".card__button");

// блок карточки с результатами
const cardResalt = document.querySelector(".quiz__card-result");
const buttonCardResalt = document.querySelector(".card__button-end");
const buttonRepeat = document.querySelector(".card-result__buttons-repeat");

// для будущей логики
let arr1 = [];
let arr2 = [];
let arr3 = [];
let programming = document.getElementById("programming").id;

// нажатие кнопок кнопок из первой карточки
function ArrayFirstCard() {
  buttonFirstCardBtn.forEach((el) => {
    arr1.push(el.id);
    el.addEventListener("click", setCardSecondAction);
    function setCardSecondAction() {
      el.classList.add("button-pressed");
      secondCardClose.classList.add("disconnect");
      secondCardOpen.classList.remove("disconnect");
    }
  });
}

ArrayFirstCard();

// нажатие кнопок из второй карточки карточки
function ArraySecondCard() {
  buttonSecondCardBtn.forEach((el) => {
    arr2.push(el.id);
    el.addEventListener("click", setCardTherdAction);
    function setCardTherdAction() {
      el.classList.add("button-pressed");
      thirdCardClose.classList.add("disconnect");
      thirdCardOpen.classList.remove("disconnect");
    }
  });
}

// нажатие кнопок из третьей карточки карточки
function ArrayThidrCard() {
  buttonThirdCard.forEach((el) => {
    arr3.push(el.id);
    el.addEventListener("click", () => {
      el.classList.add("button-pressed");
      buttonCardResalt.classList.add("button-end__active");
      buttonCardResalt.addEventListener("click", setReasalt);
    });
    function setReasalt() {
      firstCard.classList.add("disconnect");
      secondCardOpen.classList.add("disconnect");
      thirdCardOpen.classList.add("disconnect");
      cardResalt.classList.remove("disconnect");
    }
  });
}

// нажатие кнопки возврата
function Repeat() {
  buttonRepeat.addEventListener("click", () => {
    buttonFirstCardBtn.forEach((el) => {
      el.classList.remove("button-pressed");
    });
    buttonSecondCardBtn.forEach((el) => {
      el.classList.remove("button-pressed");
    });
    buttonSecondCardBtn.forEach((el) => {
      el.classList.remove("button-pressed");
    });
    cardResalt.classList.add("disconnect");
    firstCard.classList.remove("disconnect");
    secondCardClose.classList.remove("disconnect");
    thirdCardClose.classList.remove("disconnect");
  });
}

ArrayFirstCard();
ArraySecondCard();
ArrayThidrCard();
Repeat();
// console.log("programming", programming);

// функция открытия второй карточки

// ========== конец блока quiz ============
