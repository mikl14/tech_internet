const skills = {
  data: [
    { skill: "Java", level: 70, icon: "java.svg" },
    { skill: "C#", level: 30, icon: "Csharp.svg" },
    { skill: "C++", level: 30, icon: "cpp.svg" },
    { skill: "CSS", level: 5, icon: "css.svg" }
  ],

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
      parentElement.append(dt,dd);
    });
  }
};

const skillList = document.querySelector("dl.skillList");
skills.generateList(skillList);
