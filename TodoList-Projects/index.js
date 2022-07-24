let order = prompt("What you want to do");

const todoList = [];
while (order !== "quit") {
  switch (order) {
    case "new":
      const todo = prompt("Enter new todo");
      todoList.push(todo);
      order = prompt("What you want to do");
      break;
    case "list":
      for ([key, value] of Object.entries(todoList)) {
        console.log(`${+key + 1} : ${value}`);
      }
      order = prompt("What you want to do");
      break;
    case "delete":
      let remove = prompt("Which task is you want to delete?");
      const isNotIndex = isNaN(remove);
      let index;
      if (isNotIndex) {
        if (!todoList.includes(remove)) {
          alert("There is no this task");
          remove = prompt("Which task is you want to delete?");
        } else {
          index = todoList.findIndex((item) => item === remove);
        }
      } else {
        if (remove > todoList.length) {
          alert("There is no this task");
          remove = prompt("Which task is you want to delete?");
        }
        index = remove - 1;
      }
      console.log(`Delete Task : ${todoList[index]}`);
      todoList.splice(index, 1);
      order = prompt("What you want to do");
      break;
    case null:
      order = "quit";
      break;
    default:
      order = prompt("What you want to do");
      break;
  }
}
