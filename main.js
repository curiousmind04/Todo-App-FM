const form = document.querySelector(".form");
const formInput = document.querySelector(".form input");
const remaining = document.querySelector(".remaining");
const list = document.querySelector(".ul");
const completedList = document.querySelector(".completed-list");
const activeList = document.querySelector(".active-list");
const allList = document.querySelector(".all-list");
const clearCompleted = document.querySelector(".clear");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formInput.value.length > 0) {
    //create list item

    const item = document.createElement("li");
    item.setAttribute("class", "list-item");

    //create list item text

    const itemText = document.createElement("p");
    itemText.setAttribute("class", "text");
    itemText.innerHTML = formInput.value;

    //create checkbox

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

    //create delete item cross

    const crossContainer = document.createElement("div");
    crossContainer.setAttribute("class", "cross-container");
    const cross = document.createElement("img");
    cross.src = "images/icon-cross.svg";
    cross.alt = "cross icon";
    crossContainer.appendChild(cross);

    //add the children of the list item

    item.appendChild(checkboxContainer);
    item.appendChild(itemText);
    item.appendChild(crossContainer);

    //insert list item into list

    list.insertBefore(item, list.children[list.children.length - 1]);

    //reset input

    formInput.value = "";

    //update number of remaining items in list

    remaining.innerHTML = list.children.length - 1;

    //checkox checked logic

    const checkboxState = () => {
      if (checkbox.checked === true) {
        console.log(checkbox.checked);
        checkbox.parentElement.parentElement.classList.add("completed");
        if (activeList.classList.contains("active")) {
          activeList.click();
        }
      } else {
        console.log(checkbox.checked);
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
    });

    //clear completed items logic

    clearCompleted.addEventListener("click", () => {
      if (item.classList.contains("completed")) {
        //remove list item

        item.remove();
      }
      //update number of remaining items in list

      remaining.innerHTML = list.children.length - 1;
    });

    // delete cross logic

    cross.addEventListener("click", () => {
      //remove list item

      cross.parentElement.parentElement.remove();

      //update number of remaining items in list

      remaining.innerHTML = list.children.length - 1;
    });
  }
});
