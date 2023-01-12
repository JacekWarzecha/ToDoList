{
  let tasks = [];

  let hideDoneTasks = false;

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const addTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (index) => {
    (tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)]), render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-buttonRemove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-buttonDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    const hideButton = document.querySelector(".js-hideButton");

    if (hideButton) {
      hideButton.addEventListener("click", toggleHideDoneTasks);
    }

    const markAsDoneButton = document.querySelector(".js-markAsDone");

    if (markAsDoneButton) {
      markAsDoneButton.addEventListener("click", markAllTasksDone);
    }
  };

  const autofocus = () => {
    document.querySelector(".js-newTask").focus();
  };

  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    autofocus();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }

    addTask(newTaskContent);

    autofocus();
    clearInput();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="container__listItem ${
          task.done && hideDoneTasks ? "container__listItem--hidden" : ""
        }">
            <button class=" js-buttonDone container__listButton container__listButton--done">
              ${task.done ? "✔" : ""}
            </button>
            <span class="${task.done ? "container__listItem--done" : ""}" >
              ${task.content}
            </span>
            <button class=" js-buttonRemove container__listButton container__listButton--red">🗑️</button>
        </li>
      `;
    }
    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const htmlStringSecond = document.querySelector(".js-remoteButtons");

    if (!tasks.length) {
      htmlStringSecond.innerHTML = "";
      return;
    }

    htmlStringSecond.innerHTML = `

      <button class=" js-hideButton container__remoteButtons">${
        hideDoneTasks ? "Pokaż" : "Ukryj"
      } ukończone</button>
      <button class=" js-markAsDone container__remoteButtons" ${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>Ukończ wszystkie</button>
    `;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
