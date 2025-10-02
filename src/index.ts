import { v4 as uuidv4 } from "uuid";

type Task = { id: string; title: string; completed: boolean; createdAt: Date };

const list = document.getElementById("list") as HTMLUListElement;
const form = document.getElementById("form-for-input") as HTMLFormElement;
const taskTitle = document.getElementById("new-task") as HTMLInputElement;
let tasks: Task[] = getItems();

tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskTitle.value === "" || taskTitle.value == null) return;
  const newTask = {
    id: uuidv4(),
    title: taskTitle.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveItems();
  addListItem(newTask);

  taskTitle.value = "";
});

function addListItem(newTask: Task) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = newTask.completed;
  checkBox.addEventListener("change", () => {
    newTask.completed = checkBox.checked;
    saveItems();
  });

  label.append(checkBox, newTask.title);
  li.append(label);
  list.append(li);
}

function saveItems() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function getItems() {
  const tasks = localStorage.getItem("TASKS");
  if (tasks) {
    return JSON.parse(tasks);
  }

  return [];
}
