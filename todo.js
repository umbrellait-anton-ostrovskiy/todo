function getTodo(index) {
    const todos = [...document.getElementsByClassName('card_todo')];
    return todos.find((item) => item.dataset.index === index)
}

let arr = {}
let counter = 0
let addButton = document.getElementsByClassName('add_todo')[0]

let saveButton = document.createElement('button')
saveButton.classList.add('save_button')
saveButton.append("сохранить")
saveButton.addEventListener('click', saveTodo)

let deletButton = document.createElement('button')
deletButton.classList.add('delet_button')
deletButton.append('удалить')
deletButton.addEventListener('click', remove)

let changeButton = document.createElement('button')
changeButton.classList.add('change_button')
changeButton.append('изменить')
changeButton.addEventListener('click', change)


let selectPriority = document.createElement('select')
selectPriority.classList.add('select_priority')
let prioritsClass = ['urgently', 'notUrgently', 'pofig']
let prioritsString = ['срочно', 'несрочно', 'пофиг']
for (let i = 0; i < 3; i++) {
    let option = document.createElement("option");
    option.id = [i];
    option.text = prioritsString[i];
    selectPriority.appendChild(option);
}

function creatTodo() {
    counter++
    fillCard()
    addButton.classList.add('hidden')
}

function fillCard() {
    const creatTodo = document.createElement('div')
    creatTodo.classList.add('creat_todo')

    // const barTodo = document.createElement('section')
    // barTodo.classList.add('bar')

    // const textCard = document.createElement('section')
    // textCard.classList.add('text_card')

    const inputH = document.createElement('input')
    const inputB = document.createElement('textarea')
    inputH.classList.add('todo_header')
    inputB.classList.add('todo_body')

    // creatTodo.appendChild(textCard).append(inputH, inputB)
    // creatTodo.appendChild(barTodo).append(deletButton, saveButton, selectPriority)

    const todo = document.getElementsByClassName('todos')
    todo[0].appendChild(creatTodo).append(inputH, inputB, deletButton, saveButton, selectPriority)
}

function saveTodo(event) {
    const form = event.currentTarget.closest('div');

    const headerCard = form.querySelector('.todo_header').value
    const bodyCard = form.querySelector('.todo_body').value
    const innerCounter = form.dataset.index ? Number(form.dataset.index) : counter;
    const selectPriorityId = form.querySelector('.select_priority').selectedOptions[0].id

    const todos = JSON.parse(localStorage.getItem('todo_List')) || []
    const todoIndex = todos.findIndex((todo) => todo.counter == Number(form.dataset.index))

    if (headerCard === '') {
        return
    }
    createCard(headerCard, bodyCard, innerCounter, selectPriorityId, todoIndex)

    addButton.classList.remove('hidden')
    deletButton.classList.remove('hidden')
    changeButton.classList.remove('hidden')


    let obf = {
        counter: innerCounter,
        inputH: headerCard,
        inputB: bodyCard,
        priority: selectPriorityId
    }

    if (todoIndex !== -1) {
        todos[todoIndex] = obf
    } else {
        todos.push(obf)
        form.remove();
    }
    localStorage.setItem('todo_List', JSON.stringify(todos))
}

function createCard(headerCard, bodyCard, counter, priority, todoIndex = -1) {
    const creatTodo = document.createElement('div')
    creatTodo.classList.add('card_todo')
    const bigButton = document.getElementsByClassName('new_todo')[0]

    creatTodo.dataset.index = counter

    const divH = document.createElement('div')
    divH.innerHTML = headerCard
    const divB = document.createElement('div')
    divB.innerHTML = bodyCard
    divH.classList.add('card_header')
    divB.classList.add('card_Body')

    const priorityId = priority 
    if ( priorityId == 0 ){
        creatTodo.classList.add('red')
    } else if ( priorityId == 1) {
        creatTodo.classList.add('yellov')
    } else if ( priorityId == 2) {
        creatTodo.classList.add('green')
    }

    const deleteB = deletButton.cloneNode(true)
    deleteB.addEventListener('click', remove)
    const changeB = changeButton.cloneNode(true)
    changeB.addEventListener('click', change)
    const todo = document.getElementsByClassName('todos')
    creatTodo.append(divH, divB, changeB, deleteB)

    // const barTodo = document.createElement('section')
    // barTodo.classList.add('bar')
    // const textCard = document.createElement('section')
    // textCard.classList.add('text_card')
    // textCard.append(divH, divB)
    // barTodo.append(chang, delet)

    if (todoIndex == -1) {
        todo[0].insertBefore(creatTodo, bigButton)
    } else {
        const div = document.querySelector(`.card_todo[data-index='${counter}']`)
        console.log(div)
        todo[0].replaceChild(creatTodo, div)
        
    }
}

function change(event) {
    const todo = getTodo(event.target.closest('div').dataset.index)
    // const bar = todo.querySelector('.bar')
    // bar.remove()

    const startValueH = todo.querySelector('.card_header').textContent
    const newInputH = document.createElement('input')
    newInputH.classList.add('todo_header')
    newInputH.value = startValueH

    // const barTodo = document.createElement('section')
    // barTodo.classList.add('bar')
    // const delet = deletButton.cloneNode(true)
    // delet.addEventListener('click', remove)
    const saveB = saveButton.cloneNode(true)
    saveB.addEventListener('click', saveTodo)

    todo.querySelector('.change_button').classList.add('hidden')

    todo.append(saveB, selectPriority)

    const startValueB = todo.querySelector('.card_Body').textContent
    const newInputB = document.createElement('textarea')
    newInputB.classList.add('todo_body')
    newInputB.value = startValueB

    todo.prepend(newInputB)
    todo.prepend(newInputH)
    todo.querySelector('.card_Body').remove()
    todo.querySelector('.card_header').remove()

}

function remove(event) {
    const daddy = event.target.closest('div')
    if (daddy.classList.contains('creat_todo')) {
        addButton.classList.remove('hidden')
    }
    const todos = JSON.parse(localStorage.getItem('todo_List'))
    const todoIndex = todos.findIndex((todo) => todo.counter === Number(daddy.dataset.index))
    todos.splice(todoIndex, 1)
    localStorage.setItem('todo_List', JSON.stringify(todos))
    daddy.remove()
    arr = todos;
}

function load() {
    arr = JSON.parse(localStorage.getItem('todo_List')) || []
    for (let elem of arr) {
        createCard(elem.inputH, elem.inputB, elem.counter, elem.priority)
        counter = counter > elem.counter ? counter : elem.counter;
    }
}

document.addEventListener('DOMContentLoaded', load())