const { app, BrowserWindow } = require('electron');
const axios = require("axios");

var todoList = document.getElementById("todo-list-id");
function getTodos() {
    axios.get("http://localhost:8080/todos/user/1")
        .then(res => {
            console.log(res);
            var stringHtml = "";
            res.data.map(x => { stringHtml += `<li class="todo"><span class="todo__content">${x.description}</span> <button onclick="deleteTodo(${x.id})">Delete</button></li>` })
            todoList.innerHTML = stringHtml;

        })
}

function deleteTodo(id) {
    console.log("delete " + id);
    axios.delete("http://localhost:8080/todos/" + id)
        .then(() => getTodos())

}

function createTodo() {
    var todo = document.getElementById("todo");
    console.log("create " + todo.value);
    axios.post("http://localhost:8080/todos/", {
        description: todo.value,
        completed: false,
        userId: 1
    }).then(() => {
        console.log("created");
        getTodos();
    })
}

getTodos();
