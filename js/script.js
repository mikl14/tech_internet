function getComparer(prop, reverse) {
  return function (a, b) {
    if (a[prop] < b[prop]) return reverse ? 1 : -1;
    if (a[prop] > b[prop]) return reverse ? -1 : 1;
    return 0;
  }
}

const skills = {
  data: [],

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
    if (this.currentSortProp === prop) {
      this.data.reverse();
      this.sortOrder[prop] = !this.sortOrder[prop];
    } else {
      for (let key in this.sortOrder) {
        this.sortOrder[key] = false;
      }
      this.sortOrder[prop] = true;
      this.data.sort(getComparer(prop, this.sortOrder[prop]));
      this.currentSortProp = prop;
    }
    this.generateList(this.skillList);
  },

getData(path) {
    fetch(path)
        .then(data => data.json())
        .then(object => {
            this.data = object;
            
            if (this.skillList) {
                this.generateList(this.skillList);
            }
        })
        .catch(error => {
            console.error('Что-то пошло не так:', error);
            this.data = [];
            
            const skillsSection = document.querySelector('section.skills');
            if (skillsSection) {
                skillsSection.classList.add('visuallyHidden');
            }
        });
}


};
skills.getData('db/skills.json');
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

const menuController = {
    menu: document.querySelector("nav.mainNav"),
    navBtn: document.querySelector("button.navBtn"),
    
    open() {
        if (this.menu) {
            this.menu.classList.remove("mainNavClosed");
            this.navBtn.classList.remove("navBtnOpen");
            this.navBtn.classList.add("navBtnClose");
            const hiddenText = this.navBtn.querySelector(".visuallyHidden");
            if (hiddenText) {
                hiddenText.textContent = "Закрыть меню";
            }
        }
    },
    
    close() {
        if (this.menu) {
            this.menu.classList.add("mainNavClosed");
            this.navBtn.classList.remove("navBtnClose");
            this.navBtn.classList.add("navBtnOpen");
            const hiddenText = this.navBtn.querySelector(".visuallyHidden");
            if (hiddenText) {
                hiddenText.textContent = "Открыть меню";
            }
        }
    }
};

menuController.navBtn?.addEventListener("click", (e) => {
    if (e.target.classList.contains("navBtnOpen")) {
        menuController.open();
    } else {
        menuController.close();
    }
});

menuController.close();

const checkbox = document.querySelector('.switchCheckbox');
const body = document.body;

function applyTheme(isChecked) {
  if (isChecked) {
    body.classList.remove('dark-theme');
  } else {
    body.classList.add('dark-theme');
  }
  checkbox.checked = isChecked;
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme !== null) {
  applyTheme(savedTheme === 'light');
} else {
  applyTheme(true);
}

checkbox.addEventListener('change', () => {
  const theme = checkbox.checked ? 'light' : 'dark';
  applyTheme(checkbox.checked);
  localStorage.setItem('theme', theme);
});