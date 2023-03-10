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
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
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

  const focusInput = () => {
    document.querySelector(".js-newTask").focus();
  };

  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent !== "") {
      addTask(newTaskContent);
    }

    focusInput();
    clearInput();
  };

  const renderTasks = () => {
    const taskToHTML = (task) => `
        <li class="
        tasks__listItem ${
          task.done && hideDoneTasks ? "tasks__listItem--hidden" : ""
        }">
          <button class=" js-buttonDone tasks__listButton tasks__listButton--done">
            ${task.done ? "???" : ""}
          </button>
          <span class="${task.done ? "tasks__listItem--done" : ""}" >
            ${task.content}
          </span>
          <button class=" js-buttonRemove tasks__listButton tasks__listButton--red">???????</button>
        </li>
      `;

    const tasksElement = document.querySelector(".js-tasksList");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsToHTML = document.querySelector(".js-remoteButtons");

    if (!tasks.length) {
      buttonsToHTML.innerHTML = "";
      return;
    }

    buttonsToHTML.innerHTML = `

      <button class=" js-hideButton remoteButtons__buttons">${
        hideDoneTasks ? "Poka??" : "Ukryj"
      } uko??czone</button>
      <button class=" js-markAsDone remoteButtons__buttons" ${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>Uko??cz wszystkie</button>
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
