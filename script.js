let ul = document.querySelector('.task-list')
let input = document.querySelector('.task-input-container input')
let addBtn = document.querySelector('.task-input-container a')
let doneBtn = document.getElementById('task-done')
let deleteBtn = document.getElementById('task-delete')

showTask()
showStyle()

addBtn.addEventListener('click', () => {
  let txt = input.value
  if (txt.trim() !== '') {
    input.value = ''
    addTask(txt)
  }
})

function addTask(txt) {
  let getLocalStorage = localStorage.getItem('tasks')
  if (getLocalStorage == null) {
    taskList = []
  } else {
    taskList = JSON.parse(getLocalStorage)
  }
  taskList.push([txt, false])
  localStorage.setItem('tasks', JSON.stringify(taskList))
  showTask()
}

function showTask() {
  let getLocalStorage = localStorage.getItem('tasks')
  if (getLocalStorage == null) {
    taskList = []
  } else {
    taskList = JSON.parse(getLocalStorage)
  }
  if (taskList.length > 0) {
    let newLi = ''
    taskList.forEach((item, index) => {
      newLi += `<li>
              <span>${item[0]}</span>
              <ion-icon
                name="checkmark-circle-outline"
                id="task-done"
                onClick="taskDone(${index})"
              ></ion-icon>
              <ion-icon name="trash-outline" id="task-delete" onClick="deleteTask(${index})"></ion-icon>
            </li>`
    })
    ul.innerHTML = newLi
  } else {
    console.log('task list is empty')
  }
  showStyle()
}

function taskDone(i) {
  let getLocalStorage = localStorage.getItem('tasks')
  taskList = JSON.parse(getLocalStorage)
  if (taskList[i][1] === true) {
    taskList[i][1] = false
  } else if (taskList[i][1] === false) {
    taskList[i][1] = true
  }
  localStorage.setItem('tasks', JSON.stringify(taskList))
  showStyle()
}

function deleteTask(i) {
  let getLocalStorage = localStorage.getItem('tasks')
  taskList = JSON.parse(getLocalStorage)
  taskList.splice(i, 1)
  localStorage.setItem('tasks', JSON.stringify(taskList))
  if (taskList.length === 0) {
    ul.innerHTML = ''
  }
  showTask()
}

function showStyle() {
  let allLi = document.querySelectorAll('li')
  let getLocalStorage = localStorage.getItem('tasks')
  if (getLocalStorage == null) {
    taskList = []
  } else {
    taskList = JSON.parse(getLocalStorage)
  }
  if (taskList.length > 0) {
    taskList.forEach((item, index) => {
      let span = allLi[index].childNodes[1]
      let icon = allLi[index].childNodes[3]
      console.log(icon)
      if (item[1] === true) {
        span.classList.add('done')
        icon.setAttribute('name', 'close-circle-outline')
      } else {
        span.classList.remove('done')
        icon.setAttribute('name', 'checkmark-circle-outline')
      }
    })
  } else {
    console.log('Task list empty')
  }
}
