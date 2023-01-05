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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="container__listItem">
          <div>

          <button class="container__listButton">🟩</button>
          

          ${task.content}
          </div>
          <div>

          <button class="container__listButton--red">🗑️</button>
          </div>

        </li>
      `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();
      if (newTaskContent === "") {
        return;
      }
      tasks.push({
        content: newTaskContent,
      });

      render();
    });
  };

  init();
}
