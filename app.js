(function () {
  let header = document.querySelector(".header");
  let burgerBtn = header.querySelector(".header__hamburger");
  let navbarLinks = Array.from(header.querySelectorAll("nav li"));

  burgerBtn.addEventListener("click", (e) => {
    burgerBtn.classList.toggle("active");
    header.classList.toggle("active");

    navbarLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `linksAnimation 0.3s linear ${
          index / 10 + 0.4
        }s forwards`;
      }
    });
  });

  /*action section*/
  let bookmarkBtn = document.querySelector(".bookmark_btn");

  bookmarkBtn.addEventListener("click", () => {
    if (!bookmarkBtn.classList.contains("active")) {
      bookmarkBtn.classList.add("active");
      localStorage.setItem("bookmark", "active");
    } else {
      bookmarkBtn.classList.remove("active");
      localStorage.setItem("bookmark", null);
    }
  });

  localStorage.getItem("bookmark") === "active"
    ? bookmarkBtn.classList.add("active")
    : bookmarkBtn.classList.remove("active");

  //call to action buttons
  let webOverlay = document.querySelector(".website-overlay");
  let backingProjectBox = document.querySelector(".backing-project");
  let cancelBtn = backingProjectBox.querySelector(".cancel-btn");
  let backBtns = document.querySelectorAll(".back-btn");

  for (let btn of backBtns) {
    btn.addEventListener("click", () => {
      makeActiveAll(webOverlay, backingProjectBox);
      setMaxHeight(backingProjectBox);
    });
  }

  cancelBtn.addEventListener("click", () => {
    removeActiveAll(webOverlay, backingProjectBox);
    resetMaxHeight(backingProjectBox);
  });

  //success box
  let successBox = document.querySelector(".success");
  let successBtn = document.querySelector(".success button");
  successBtn.addEventListener("click", () => {
    removeActiveAll(successBox, webOverlay);
  });
  /*about section*/
  let standBoxes = Array.from(document.querySelectorAll(".stand")).map(
    (box) => {
      let standBox = {};
      standBox["standBox"] = box;
      standBox["amount"] = box.querySelector(".number");
      standBox["header"] = box.querySelector(".stand-info h2");
      standBox["btn"] = box.querySelector("button");

      return standBox;
    }
  );
  function updateStandBox(selectedBox) {
    for (let box of standBoxes) {
      if (selectedBox != null) {
        if (box["header"].textContent == selectedBox["header"].textContent) {
          box["amount"].textContent = --box["amount"].textContent;
        }
      }
      if (box["amount"].textContent == 0) {
        box["standBox"].classList.add("empty");
        box["btn"].classList.add("disabled");
        box["btn"].disabled = true;
        box["btn"].textContent = "Out of Stock";
      }
    }
  }
  updateStandBox(null);

  /*inside back-boxes*/
  let backBoxes = Array.from(document.querySelectorAll(".back-box")).map(
    (box) => {
      let boxObj = {};
      boxObj["back-box"] = box;
      boxObj["header"] = box.querySelector(".back-box__pricing h2");
      boxObj["radio"] = box.querySelector(".radio-btn");
      boxObj["amount"] = box.querySelector(".back-box__amount .number");
      boxObj["cont-btn"] = box.querySelector(".back-continue-box");
      boxObj["pledge"] = box.querySelector(".back-box__pledge");
      boxObj["label"] = box.querySelector(".pledge__submit label");
      boxObj["input"] = box.querySelector(".pledge-input");

      boxObj["header"].addEventListener("click", () => updateBox(boxObj));
      boxObj["radio"].addEventListener("click", () => updateBox(boxObj));
      boxObj["cont-btn"].addEventListener("click", () => checkInput(boxObj));

      return boxObj;
    }
  );

  console.log(backBoxes);

  function updateBackBoxes() {
    for (const box of backBoxes) {
      if (box["amount"] != null) {
        if (Number(box["amount"].textContent) == 0) {
          box["back-box"].classList.add("empty");
          resetMaxHeight(box["pledge"]);
          removeActiveAll(box["radio"], box["back-box"]);
        }
      }
    }
  }
  updateBackBoxes();

  function updateBox(selectedBox) {
    if (!selectedBox["back-box"].classList.contains("empty")) {
      for (let box of backBoxes) {
        resetMaxHeight(box["pledge"]);
        removeActiveAll(box["radio"], box["back-box"]);
      }

      setMaxHeight(selectedBox["pledge"]);
      makeActiveAll(selectedBox["radio"], selectedBox["back-box"]);
    }
  }

  function checkInput(selectedBox) {
    //box withoud input field
    if (selectedBox["input"] == null) {
      removeActiveAll(backingProjectBox);
      resetMaxHeight(backingProjectBox);
      makeActiveAll(successBox);
    } else {
      let value = selectedBox["input"].value;
      let min = Number(selectedBox["input"].dataset.minValue);
      let max = Number(selectedBox["input"].dataset.maxValue);
      let regex = new RegExp(selectedBox["input"].dataset.regex);

      if (Number(value) >= min && Number(value) <= max && regex.test(value)) {
        selectedBox["label"].classList.remove("error");
        selectedBox["amount"].textContent = --selectedBox["amount"].textContent;
        updateBackBoxes();

        removeActiveAll(backingProjectBox);
        resetMaxHeight(backingProjectBox);
        makeActiveAll(successBox);

        updateStandBox(selectedBox);
      } else {
        selectedBox["label"].classList.add("error");
      }
    }
  }
})();

function resetMaxHeight(el) {
  let elements = Array.from(arguments);
  elements.forEach((element) => {
    if (Array.isArray(element)) {
      element.forEach((el) => {
        el.style.maxHeight = "";
      });
    } else {
      element.style.maxHeight = "";
    }
  });
}

function setMaxHeight() {
  let elements = Array.from(arguments);
  elements.forEach((element) => {
    if (Array.isArray(element)) {
      element.forEach((el) => {
        el.style.maxHeight = el.scrollHeight + "px";
      });
    } else {
      element.style.maxHeight = element.scrollHeight + "px";
    }
  });

  if (elements.length === 1) {
    elements[0].style.maxHeight = elements[0].scrollHeight + "px";
  } else {
    elements.forEach((el) => {
      el.style.maxHeight = el.scrollHeight + "px";
    });
  }
}

function makeActiveAll() {
  let elements = Array.from(arguments);
  elements.forEach((element) => {
    if (Array.isArray(element)) {
      element.forEach((el) => {
        el.classList.add("active");
      });
    } else {
      element.classList.add("active");
    }
  });
}

function removeActiveAll() {
  let elements = Array.from(arguments);

  elements.forEach((element) => {
    if (Array.isArray(element)) {
      element.forEach((el) => {
        el.classList.remove("active");
      });
    } else {
      element.classList.remove("active");
    }
  });
}
