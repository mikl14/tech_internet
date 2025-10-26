const skills = {
  data: [
    { skill: "Java", level: 70, icon: "java.svg" },
    { skill: "C#", level: 30, icon: "Csharp.svg" },
    { skill: "C++", level: 30, icon: "cpp.svg" },
    { skill: "CSS", level: 5, icon: "css.svg" }
  ],

  sortOrder: {
    skill: false,
    level: false
  },

  skillList: null,

  generateList(parentElement) {
    parentElement.innerHTML = "";
    this.data.forEach(item => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      const div = document.createElement("div");

      dd.classList.add("progressBar");
      div.classList.add("progressBarInner");

      dt.textContent = item.skill;
      dt.style.backgroundImage = `url('icons/${item.icon}')`;

      div.style.width = `${item.level}%`;

      dd.appendChild(div);
      parentElement.append(dt, dd);
    });
  },

  sortList(prop) {
    this.sortOrder[prop] = !this.sortOrder[prop];
    this.data.sort(this.getComparer(prop, this.sortOrder[prop]));
    this.generateList(this.skillList);
  },

  getComparer(prop, reverse) {
    return function (a, b) {
      if (a[prop] < b[prop]) return reverse ? 1 : -1;
      if (a[prop] > b[prop]) return reverse ? -1 : 1;
      return 0;
    }
  }
};

skills.skillList = document.querySelector("dl.skillList");
skills.generateList(skills.skillList);

let buttons = document.querySelector("div.skillsHeaderRight");
buttons.addEventListener("click", (e) => {
  let target = e.target;
  if (target.nodeName === "BUTTON") {
    switch (target.dataset.type) {
      case 'name':
        skills.sortList('skill');
        break;
      case 'level':
        skills.sortList('level');
        break;
      default:
        console.log(target.dataset.type);
    }
  }
});
