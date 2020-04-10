/* eslint-disable no-unused-vars */

const axios = require("axios");

var todoList = document.getElementById("todo-list-id");
function getTodos() {
    axios.get("http://localhost:8080/todos/user/1")
        .then(res => {
            console.log(res);
            var stringHtml = "";
            res.data.map(x => { stringHtml += `<li class="${x.completed? "todo todo--completed": "todo"}" onclick="setCompleted(this, ${x.id}, ${x.completed})"><a class="filter__link" href="#" onclick="deleteTodo(event, ${x.id})"><i class="fa fa-times"></i></a> <span class="todo__content">${x.description}</span></li>` })
            todoList.innerHTML = stringHtml;

        })
}

function deleteTodo(e, id) {
    e.preventDefault();
    console.log("delete " + id);
    axios.delete("http://localhost:8080/todos/" + id)
        .then(() => getTodos())

}

function setCompleted(element, id, completed){
    console.log("Completed " + element + id)
    element.className = completed ? "todo": "todo todo--completed";
    axios.put("http://localhost:8080/todos/" + id, {
        completed: !completed,
    }).then(() => getTodos());

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
