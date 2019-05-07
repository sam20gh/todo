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
  projectLi.innerText = `${project.name}`
  document.body.append(projectLi) // TO UPDATE ONCE CONTAINER IDENTIFIED
}

const renderProjects = (projects) => {
  projects.forEach(renderProjectLi)
}

const renderTaskLi = (task) => {
  const taskLi = document.createElement('li')
  taskLi.id = `task-list${task.id}`
  taskLi.innerText = `${task.description}`
  document.body.append(taskLi)  // TO UPDATE ONCE CONTAINER IDENTIFIED
}

const renderTasks = (tasks) => {
  tasks.forEach(renderTaskLi)
}

const init = () => {
  getData()
  .then(getAllUsers)
  allUsers.find()
  renderProjects(USERS[1]["projects"])
  renderTasks(USERS[1]["projects"][0]["tasks"])
}

init()
