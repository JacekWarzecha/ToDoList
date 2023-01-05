{
  const tasks = [
    {
      content: "Przygotuj projekty",
      done: false,
    },
    {
      content: "Przygotuj cv",
      done: true,
    },
  ];

  const addTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
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
          <div>

          <button class="container__listButton">🟩</button>
          </div>
          <div>

          ${task.content}
          </div>
          <div class="container__listItem--end">

          <button class=" js-buttonRemove container__listButton--red">🗑️</button>
          </div>

        </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-buttonRemove");
    console.log(removeButtons);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
