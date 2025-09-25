const skills = {
  data: [
    { skill: "Java", level: 70, cssClass: "javaIcon", icon: "java.svg" },
    { skill: "C#", level: 30, cssClass: "csharpIcon", icon: "Csharp.svg" },
    { skill: "C++", level: 30, cssClass: "cppIcon", icon: "cpp.svg" },
    { skill: "CSS", level: 5, cssClass: "cssIcon", icon: "css.svg" }
  ],

  generateList(parentElement) {
    parentElement.innerHTML = "";

    this.data.forEach(item => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      const div = document.createElement("div");

      dt.classList.add(item.cssClass);
      dd.classList.add("progressBar");
      div.classList.add("progressBarInner");

      dt.textContent = item.skill;
      dt.style.backgroundImage = `url('icons/${item.icon}')`;
      dt.style.backgroundRepeat = "no-repeat";
      dt.style.backgroundPosition = "left center";
      dt.style.paddingLeft = "40px";

      div.style.width = `${item.level}%`;

      dd.appendChild(div);
      parentElement.appendChild(dt);
      parentElement.appendChild(dd);
    });
  }
};

// Вызов метода вне объекта
const skillList = document.querySelector("dl.skillList");
skills.generateList(skillList);
