export default class Vacancies {
  constructor(a) {
    this._some = a;
    this._vacancies = document.querySelectorAll(".vacancies__position");
    this._title = document.getElementById("positionsListTitle");
    this._pythonVac = vacancies[0];
    this._analisVac = vacancies[1];
    this._mentorButton = document.getElementById("vacMentorButton");
    this._reviewerButton = document.getElementById("vacReviewerButton");
    this._roleButtons = document.querySelectorAll(".vacancies__roleButton");
    this._facultyButtons = document.querySelectorAll(
      ".vacancies__facultyButton"
    );
    this._designButton = document.getElementById("vacDesignButton");
    this._programmingButton = document.getElementById("vacProgrammingButton");
    this._analisysButton = document.getElementById("vacAnalisysButton");
    this._marketingButton = document.getElementById("vacMarketingButton");
    this._managementButton = document.getElementById("vacManagementButton");
    this._allButton = document.getElementById("vacAllButton");
    this._role = "";
    this._faculty = "all";
    console.log(this._vacancies);
  }

  _renderFacultButtons(id) {
    this._facultyButtonst.forEach((e) => {
      e.id === id
        ? e.classList.add("vacancies__facultyButton_active")
        : e.classList.remove("vacancies__facultyButton_active");
    });
  }

  _renderVacancies() {
    if (role === "reviewer") {
      this._pythonVac.classList.remove("vacancies__position_shown");
      this._analisVac.classList.remove("vacancies__position_shown");
      this._title.textContent += ` (0)`;
    } else if (faculty === "all") {
      this._pythonVac.classList.add("vacancies__position_shown");
      this._analisVac.classList.add("vacancies__position_shown");
      this._title.textContent += ` (2)`;
    } else if (faculty === "programming") {
      this._pythonVac.classList.add("vacancies__position_shown");
      this._analisVac.classList.remove("vacancies__position_shown");
      this._title.textContent += ` в программировании (1)`;
    } else if (faculty === "analisys") {
      this._pythonVac.classList.remove("vacancies__position_shown");
      this._analisVac.classList.add("vacancies__position_shown");
      this._title.textContent += ` в анализе данных (1)`;
    }
  }
  setReviewer() {
    this._role = "reviewer";
    this._reviewerButton.classList.add("vacancies__roleButton_active");
    this._mentorButton.classList.remove("vacancies__roleButton_active");
  }
  setMentor() {
    this._role = "mentor";
    this._reviewerButton.classList.remove("vacancies__roleButton_active");
    this._mentorButton.classList.add("vacancies__roleButton_active");
  }
  setDesign() {
    this._faculty = "design";
    this._renderFacultButtons("vacDesignButton");
  }
  setProgramming() {
    this._faculty = "programming";
    this._renderFacultButtons("vacProgrammingButton");
  }
  setAnalisys() {
    this._faculty = "analisys";
    this._renderFacultButtons("vacAnalisysButton");
  }
  setMarketing() {
    this._faculty = "marketing";
    this._renderFacultButtons("vacMarketingButton");
  }
  setManagement() {
    this._faculty = "management";
    this._renderFacultButtons("vacManagementButton");
  }
  setAll() {
    this._faculty = "all";
    this._renderFacultButtons("vacAllButton");
  }
  _setListeners() {
    this._reviewerButton.addEventListener("click", () => {
      this.setReviewer();
      this._renderVacancies();
    });
    this._mentorButton.addEventListener("click", () => {
      this.setMentor();
      this._renderVacancies();
    });
    this._designButton.addEventListener("click", () => {
      this.setDesign();
      this._renderVacancies();
    });
    this._programmingButton.addEventListener("click", () => {
      this.setProgramming();
      this._renderVacancies();
    });
    this._analisysButton.addEventListener("click", () => {
      this.setAnalisys();
      this._renderVacancies();
    });
    this._marketingButton.addEventListener("click", () => {
      this.setMarketing();
      this._renderVacancies();
    });
    this._allButton.addEventListener("click", () => {
      this.setAll();
      this._renderVacancies();
    });
  }

  initialize() {
    this._setListeners();
  }
}
