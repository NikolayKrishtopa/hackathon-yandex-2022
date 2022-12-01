const reviewerPic = new URL("../img/reviewer.png", import.meta.url);
const mentorPic = new URL("../img/mentor.png", import.meta.url);
import { gsap } from "gsap";

const modes = {
  MENTOR: "MENTOR",
  REVIEWER: "REVIEWER",
};

export default class MentorReviewer {
  constructor(config) {
    this._config = config;
    this._section = document.querySelector(this._config.section);
    this._image = document.querySelector(".mentorVSreviewer__image");
    this._title = document.querySelector(this._config.title);
    this._icons = document.querySelector(this._config.icons);
    this._personName = document.querySelector(this._config.personNameSelector);
    this._mentorIcon = document.querySelector(this._config.mentorIcon);
    this._reviewerIcon = document.querySelector(this._config.reviewerIcon);
    this._quotesContainer = document.querySelector(
      this._config.quotesContainer
    );
    this._quotesContainerModificator = document.querySelector(
      this._config.quotesContainerModificator
    );
    this._quotes = document.querySelectorAll(this._config.quotesSelector);
    this._mode = modes.MENTOR;
    this._quoteBlocks = document.querySelectorAll(this._config.quoteBlocks);
  }

  _toggleMode = () => {
    this._mode === modes.MENTOR
      ? (this._mode = modes.REVIEWER)
      : (this._mode = modes.MENTOR);
    this._showContentPerMode();
  };

  _setMentor() {
    this._mode = modes.MENTOR;
    this._showContentPerMode();
  }
  _setReviewer() {
    this._mode = modes.REVIEWER;
    this._showContentPerMode();
  }

  _showContentPerMode = () => {
    if (this._mode === modes.MENTOR) {
      this._image.src = mentorPic;
      this._image.alt = "Девушка в мультяшных очках за столом с ноутбуком";
      this._mentorIcon.classList.remove(this._config.iconInactiveClass);
      this._reviewerIcon.classList.add(this._config.iconInactiveClass);
      this._quotesContainer.classList.remove(
        this._config.quotesContainerLeftClass
      );
      this._title.textContent = this._config.mentorTitleText;
      this._personName.textContent = this._config.mentorName;
      this._quotes.forEach(
        (e, i) => (e.textContent = this._config.mentorQuoteTexts[i])
      );
      this._quoteBlocks.forEach((e, i) => {
        gsap.from(e, {
          x: 1000,
          duration: i * 1.2,
        });
      });
    } else {
      this._image.src = reviewerPic;
      this._image.alt = "Парень за рабочим столом перед монитором компьютера.";
      this._mentorIcon.classList.add(this._config.iconInactiveClass);
      this._reviewerIcon.classList.remove(this._config.iconInactiveClass);
      this._quotesContainer.classList.add(
        this._config.quotesContainerLeftClass
      );
      this._title.textContent = this._config.reviewerTitleText;
      this._personName.textContent = this._config.reviewerName;
      this._quotes.forEach(
        (e, i) => (e.textContent = this._config.reviewerQuoteTexts[i])
      );
      this._quoteBlocks.forEach((e, i) => {
        gsap.from(e, {
          x: -1000,
          duration: i * 1.2,
        });
      });
    }
  };

  addEventListeners = () => {
    this._reviewerIcon.addEventListener("click", () => {
      this._setReviewer();
    });
    this._mentorIcon.addEventListener("click", () => {
      this._setMentor();
    });
  };

  initialize() {
    this.addEventListeners();
  }
}
