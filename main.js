const form = document.querySelector(".form");
const formInput = document.querySelector(".form input");
const remaining = document.querySelector(".remaining");
const list = document.querySelector(".list");
const listContainer = document.querySelector(".list-container");
const completedList = document.querySelector(".completed-list");
const activeList = document.querySelector(".active-list");
const allList = document.querySelector(".all-list");
const clearCompleted = document.querySelector(".clear");

//sortable.js logic

var el = list;
var sortable = Sortable.create(el);

//initializing theme state

let light = false;

//todo logic

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formInput.value.length > 0) {
    //go to all todos list if not there

    if (!allList.classList.contains("active")) {
      allList.click();
    }

    //create list item

    const item = document.createElement("div");
    item.setAttribute("class", "list-item");

    //create list item text

    const itemText = document.createElement("p");
    itemText.setAttribute("class", "text");
    itemText.innerHTML = formInput.value;

    //create list item checkbox, checkmark, checkbox container

    const checkmark = document.createElement("img");
    checkmark.src = "images/icon-check.svg";
    checkmark.alt = "check icon";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("class", "checkbox");
    const checkboxContainer = document.createElement("div");
    checkboxContainer.setAttribute("class", "checkbox-container");
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    //create list item delete cross

    const crossContainer = document.createElement("div");
    crossContainer.setAttribute("class", "cross-container");
    const cross = document.createElement("img");
    cross.src = "images/icon-cross.svg";
    cross.alt = "cross icon";
    crossContainer.appendChild(cross);

    //add the children to the list item, then add list item to list
    //then reset input, then update number of remaining items in list

    item.appendChild(checkboxContainer);
    item.appendChild(itemText);
    item.appendChild(crossContainer);
    list.appendChild(item);
    formInput.value = "";
    remaining.innerHTML = parseInt(remaining.innerHTML) + 1;

    // arr.push({ value: itemText.innerHTML, checked: false });
    // console.log(arr);

    //checkox checked logic

    const checkboxState = () => {
      if (checkbox.checked === true) {
        console.log(checkbox.checked);
        remaining.innerHTML = parseInt(remaining.innerHTML) - 1;
        checkbox.parentElement.parentElement.classList.add("completed");
        if (activeList.classList.contains("active")) {
          activeList.click();
        }
      } else {
        console.log(checkbox.checked);
        remaining.innerHTML = parseInt(remaining.innerHTML) + 1;
        checkbox.parentElement.parentElement.classList.remove("completed");
        if (completedList.classList.contains("active")) {
          completedList.click();
        }
      }
    };

    checkbox.addEventListener("click", checkboxState);

    // list category logic

    completedList.addEventListener("click", () => {
      completedList.classList.add("active");
      activeList.classList.remove("active");
      allList.classList.remove("active");
      if (item.classList.contains("completed")) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
      console.log("completedlist");
    });

    activeList.addEventListener("click", () => {
      completedList.classList.remove("active");
      activeList.classList.add("active");
      allList.classList.remove("active");
      if (!item.classList.contains("completed")) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
      console.log("activelist");
    });

    allList.addEventListener("click", () => {
      completedList.classList.remove("active");
      activeList.classList.remove("active");
      allList.classList.add("active");
      item.classList.remove("hidden");
      console.log("alllist");
    });

    // click item text to check checkbox

    itemText.addEventListener("click", () => {
      checkbox.click();
      //   cross.style.display = "block";
    });

    //clear completed items logic

    clearCompleted.addEventListener("click", () => {
      if (item.classList.contains("completed")) {
        item.remove();
      }
    });

    // delete items with delete cross logic

    cross.addEventListener("click", () => {
      cross.parentElement.parentElement.remove();
      if (checkbox.checked === false) {
        remaining.innerHTML = parseInt(remaining.innerHTML) - 1;
      }
    });

    //theme switch logic

    if (light === true) {
      checkbox.classList.add("checkbox-light");
      itemText.classList.add("text-light");
      item.style.borderBottom = "1px solid hsl(233, 11%, 84%)";
    }

    lightThemeIcon.addEventListener("click", () => {
      checkbox.classList.add("checkbox-light");
      itemText.classList.add("text-light");
      item.style.borderBottom = "1px solid hsl(233, 11%, 84%)";
    });

    if (light === false) {
      checkbox.classList.remove("checkbox-light");
      itemText.classList.remove("text-light");
      item.style.borderBottom = "1px solid hsl(237, 14%, 26%)";
    }

    darkThemeIcon.addEventListener("click", () => {
      checkbox.classList.remove("checkbox-light");
      itemText.classList.remove("text-light");
      item.style.borderBottom = "1px solid hsl(237, 14%, 26%)";
    });
  }
});

//theme switch logic

const lightThemeIcon = document.querySelector(".sun-icon");
const darkThemeIcon = document.querySelector(".moon-icon");
const body = document.body;
const categoriesTheme = document.querySelector(".categories");
const categoryLinks = document.querySelector(".categories ul");
const listBottom = document.querySelector(".list-bottom");
const listBottomButton = document.querySelector(".list-bottom button");
const dragDrop = document.querySelector(".drag-drop");
const inputCircle = document.querySelector(".input-circle");

lightThemeIcon.addEventListener("click", () => {
  light = true;
  lightThemeIcon.style.display = "none";
  darkThemeIcon.style.display = "block";
  body.classList.add("body-light");
  formInput.classList.add("form-input-light");
  listContainer.style.background = "hsl(0, 0%, 98%)";
  categoriesTheme.style.background = "hsl(0, 0%, 98%)";
  categoryLinks.classList.add("category-ul-light");
  listBottom.style.color = "hsl(236, 9%, 61%)";
  listBottomButton.classList.add("list-bottom-button-light");
  dragDrop.style.color = "hsl(236, 9%, 61%)";
  inputCircle.style.border = "1px solid hsl(233, 11%, 84%)";
});

darkThemeIcon.addEventListener("click", () => {
  light = false;
  lightThemeIcon.style.display = "block";
  darkThemeIcon.style.display = "none";
  body.classList.remove("body-light");
  formInput.classList.remove("form-input-light");
  listContainer.style.background = "hsl(235, 24%, 19%)";
  categoriesTheme.style.background = "hsl(235, 24%, 19%)";
  categoryLinks.classList.remove("category-ul-light");
  listBottom.style.color = "hsl(234, 11%, 52%)";
  listBottomButton.classList.remove("list-bottom-button-light");
  dragDrop.style.color = "hsl(233, 14%, 35%)";
  inputCircle.style.border = "1px solid hsl(237, 14%, 26%)";
});
