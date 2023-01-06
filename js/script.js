{
  const tasks = [];

  const addTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }

    addTask(newTaskContent);

    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="container__listItem">

            <button class=" js-buttonDone container__listButton container__listButton--done">
              ${task.done ? "✔" : ""}
            </button>

            <span class="${task.done ? "container__listItem--through" : ""}" >
              ${task.content}

            </span>

            <button class=" js-buttonRemove container__listButton--red">🗑️</button>

        </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-buttonRemove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-buttonDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
