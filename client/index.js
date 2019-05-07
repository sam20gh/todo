const state = {
  user: USERS[0],
  allProjects: [],
  allTasks: [],
  selectedProject: null,
  tasksInProject: [],
  selectedTask: null,
}

//LOGIC FOR STATE
const addTaskToArray = (task) => state.allTasks.push(task)
const addTasksToArray = (tasks) => tasks.forEach(addTaskToArray)
const allTasksForState = (projects) => {
  projects.forEach((p) => addTasksToArray(p["tasks"]))
}


// LOGIN STUFF
let allUsers
const getAllUsers = (users) => allUsers = users //want to get an array of user objects
const findUser = (username) => allUsers.find(x => x.username === username )

//FAKE ELEMENTS

const createInboxLiEl = () => {
  const inboxLiEl = document.createElement('li')
  inboxLiEl.innerText = `(12) Inbox List Element (no of tasks: ${USERS[1]["projects"][0]["tasks"].length})`
  document.body.append(inboxLiEl)
}

const loginUser = (username) => {
  state.user = username
}

const createFakeElements = () => {
  createInboxLiEl()
}

//THINGS TO RENDER FROM DATABASE
const renderProjectLi = (project) => {
  const projectLi = document.createElement('li')
  projectLi.id = `project-list${project.id}`
  projectLi.innerHTML = `
    <a href="#"> <i class=" fa fa-sign-blank text-danger"></i>${project.name}</a>
  `

  const projectList = document.querySelector('#project-list')
  projectList.append(projectLi)
}

const renderProjects = (projects) => {
  projects.forEach(renderProjectLi)
}

const renderTaskTr = (task) => {
  const taskTr = document.createElement('tr')
  taskTr.class = "inbox-small-cells"
  taskTr.id = `task-row${task.id}`
  taskTr.innerHTML = `
      <td class="inbox-small-cells">
        <input type="checkbox" class="mail-checkbox">
      </td>
      <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
      <td class="view-message ">${task.description}</td>
      <td class="view-message  inbox-small-cells"><i class="fa fa-calendar"></i></td>
      <td class="view-message  text-right">${task.due_date}</td>
    </tr>
  `

  const itemList = document.querySelector("#item-list")
  itemList.append(taskTr)
}

const renderTasks = (tasks) => {
  tasks.forEach(renderTaskTr)
}

const init = () => {
  // getData()
  // .then(getAllUsers)
  // allUsers.find()
  renderProjects(USERS[1]["projects"])
  renderTasks(USERS[1]["projects"][1]["tasks"])
}

init()
