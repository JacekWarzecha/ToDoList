{
  let tasks = [];

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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="container__listItem">
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

    let htmlStringSecond = `
      
        <button class="container__remoteButtons">Ukryj ukończone</button> 
        <button class="container__remoteButtons">Ukończ wszystkie</button>
      
    `;

    document.querySelector(".js-remoteButtons").innerHTML = htmlStringSecond;

    bindRemoveEvents();
    bindToggleDoneEvents();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
