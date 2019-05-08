
const baseUrl = "http://localhost:3000/tasks"

//Elements to render stuff to
const projectList = document.querySelector('#project-list')
const itemList = document.querySelector("#item-list")
const viewAll = document.querySelector("#view-all")
const noDueDate = document.querySelector("#no-due-date")


//Elements to add listeners to
const loginForm = document.querySelector('#login-form')
const newTaskButtonLeft = document.querySelector("#new-task-left")

let state = {
  users: null,
  user: null,
  allProjects: [],
  allTasks: [], //flattened array
  allOutstandingTasks: [],
  project_ostasks: [],
  priority_ostasks: [{priority: 1, tasks: null}, {priority: 2, tasks: null}, {priority: 3, tasks: null}, {priority: 4, tasks: null}],
  favouriteProjects: [],
  archivedProjects: [],
  selectedProject: 4,
  tasksInProject: [],
  selectedTask: null,
  newTask: []
}

//new Task event listener
const addNewTaskListener = () => {
  newTaskButtonLeft.addEventListener("click", event => {
    event.preventDefault()
    addNewTaskForm()
  })

}

const addNewTaskForm = task => {
  const newTaskTr = document.createElement('form')
  newTaskTr.id = "task-form"
  newTaskTr.innerHTML = `
     <div class=inbox-small-cells><i class="fa fa-star"></i></div>
     <div class=view-message ><input type='text' class="form-control" placeholder="Task Description" name="description"></div>
     <div class="view-message inbox-small-cells"><i class="fa fa-calendar"></i></div>
     <div class="view-message inbox-small-cells"><input type="text" class="form-control" placeholder="due date" name="date"></div>
   </tr>
   `
   newTaskTr.addEventListener("keyup", event => {
     event.preventDefault()
     if (event.keyCode === 13)
      addNewTask()
   })

const addNewTask = () => {
  const formEl = document.querySelector("#task-form")
  state.newTask.name = formEl.description.value
  state.newTask.date = formEl.date.value
  formEl.reset()

  let task = {
     description: state.newTask.name,
     due_date: state.newTask.date,
     status: false,
     priority: 1,
     project_id: 3
   }

   createTask(task)
   newTaskTr.innerHTML = ``
   alert("task added")
 }

 const itemList = document.querySelector(".new-task")
 itemList.prepend(newTaskTr)
}

// LOGIN event listener
const addListenerLogin = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault()
    findOrCreateUser(`${loginForm.username.value}`)
    loginForm.reset()
  })
}

const findOrCreateUser = (username) => {
  user = state.users.find(x => x.username === username)
  if (user) {
    allUsers = state.users
    state = {
      users: null,
      user: null,
      allProjects: [],
      allTasks: [], //flattened array
      allOutstandingTasks: [],
      project_ostasks: [],
      priority_ostasks: [{priority: 1, tasks: null}, {priority: 2, tasks: null}, {priority: 3, tasks: null}, {priority: 4, tasks: null}],
      favouriteProjects: [],
      archivedProjects: [],
      selectedProject: 4,
      tasksInProject: [],
      selectedTask: null
    }
    state.user = user
    state.users = allUsers
    makePage()
  }
  else {
    alert("Please sign up")
  }
}

const addListenerAllPriorities = () => {
  for (let i = 1; i < state.priority_ostasks.length+1; i++) {
    document.querySelector(`#priority-${i}`).addEventListener('click', () => {
      if (state.priority_ostasks.find(o => o.priority == i).tasks.length > 0) {
        renderTasks(state.priority_ostasks.find(o => o.priority == i).tasks)
      } else {
        renderTaskTr()
      }})
    }
}

const addListenerToFilterTabItems = () => {
  addListenerAllPriorities()
  viewAll.addEventListener('click', () => renderTasks(state.allOutstandingTasks))
  noDueDate.addEventListener('click', () => alert("no due date clicked to update"))
}

//LOGIC FOR STATE
const allProjectsForState = () => state.allProjects = state.user.projects
const allFavouriteProjects = () => {
  state.favouriteProjects = state.allProjects.filter(p => p.favourite_status === true)
}
const allArchivedProjects = () => {
  state.archivedProjects = state.allProjects.filter(p => p.archive_status === true)
}
const addTaskToArray = (array, task) => array.push(task)
const addTasksToArray = (array, tasks) => tasks.forEach(t => addTaskToArray(array,t))
const allTasksForState = () => {
  state.allProjects.forEach(p => addTasksToArray(state.allTasks, p["tasks"]))
}
const findAllOutstandingTasks = () => {
  state.allOutstandingTasks = state.allTasks.filter(t => t.status == false)
}
const findOutstandingTasksInProject = (project_id) => {
  let allTasksInThisProject = state.allProjects.find(p => p.id == project_id).tasks
  let result = allTasksInThisProject.filter(t => state.allOutstandingTasks.includes(t))
  return result
}
const findPriorityTasksPair = (priority_level) => {
  object = state.priority_ostasks.find(o => o.priority == priority_level)
  object.tasks = state.allOutstandingTasks.filter(t => t.priority == priority_level)
}
const findPriorityTasksPairs = () => {
  findPriorityTasksPair(1)
  findPriorityTasksPair(2)
  findPriorityTasksPair(3)
  findPriorityTasksPair(4)
}
const inboxTasksForState = () => {
  state.selectedProject = state.allProjects.find(p => p.name.toLowerCase() == "inbox")
  state.tasksInProject = findOutstandingTasksInProject(state.selectedProject.id)
}
const renderUserData = () => {
  const userProfile = document.querySelector("#user-profile")
  userProfile.innerHTML = `
    <h5>${state.user.username}</h5>
    <span>${state.user.email}</span>
  `
}

const addStuffToState = () => {
  allProjectsForState()
  allTasksForState()
  findAllOutstandingTasks()
  allFavouriteProjects()
  allArchivedProjects()
  inboxTasksForState()
  findPriorityTasksPairs()
}

//LOGIC FOR OTHER RENDERS

// CRUD for tasks
// date/time Picker
const timepicker = () => {
}

//THINGS TO RENDER FROM DATABASE OR STATE

const renderProjectLi = (project) => {
  const projectLi = document.createElement('li')
  projectLi.id = `project-count-${project.id}`
  projectLi.innerHTML = `
    <a href="#"> <i class="fa fa-circle text-danger"></i>${project.name} <span class="label label-info pull-right">${findOutstandingTasksInProject(project.id).length}</span></a>
  `
  projectLi.addEventListener('click', () => {
    renderTasks(findOutstandingTasksInProject(project.id))
  })
  projectList.append(projectLi)
}

const renderProjects = (projects) => {
  projectList.innerHTML = `<li><h4>Projects</h4></li>`
  projects.forEach(renderProjectLi)
}

const dateTimeParser = (datestr) => {
  const jsDate = new Date(datestr)
  dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'};
  return jsDate.toLocaleDateString("en-US", dateOptions)
}

const renderTaskTr = (task) => {
  if (task) {
    const taskTr = document.createElement('tr')
    // taskTr.class = "inbox-small-cells"
    taskTr.id = `task-row${task.id}`
    let parsedDate = dateTimeParser(task.due_date)
    taskTr.innerHTML = `
        <td class="inbox-small-cells">
          <input type="checkbox" class="mail-checkbox">
        </td>
        <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
        <td class="view-message ">${task.description}</td>
        <td class="view-message inbox-small-cells"><i>${task.priority}</i></td>
        <td class="view-message inbox-small-cells"><i class="fa fa-calendar"></i></td>
        <td class="view-message text-right">${parsedDate}</td>
      </tr>
    `
    itemList.append(taskTr)
  } else {
    itemList.innerHTML = ``
    const taskTr = document.createElement('tr')
    taskTr.innerHTML = `
      <td class="view-message text-center"> </td>
      <td class="view-message text-center"> </td>
      <td class="view-message text-center">No task in this filter at the moment!</td>
      <td class="view-message text-center"></td>
      <td class="view-message text-center"></td>
    </tr>
    `
    itemList.append(taskTr)
  }
}

//vcreate new task
const createTask = task => {
  fetch(baseUrl, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(resp => resp.json())
}

const renderTasks = (tasks) => {
  if (tasks) {
  itemList.innerHTML=``
  tasks.forEach(renderTaskTr)
} else if (tasks==="nothing"){
    const taskTr = document.createElement('tr')
    taskTr.innerText = "Nothing here"
    itemList.append(taskTr)
}
}

const clearPreviousData = () => {
  projectList.innerHTML = ``
  itemList.innerHTML = ``
}
const renderStuffFromState = () => {
  renderUserData()
  renderProjects(state.allProjects)
  renderTasks(state.tasksInProject)
}
const makePage = () => {
  clearPreviousData()
  addStuffToState()
  renderStuffFromState()
}
const addBasicListeners = () => {
  addListenerLogin()
  addNewTaskListener()
  addListenerToFilterTabItems()

}
const init = () => {
  getData()
  .then(makePage)
  .then(addBasicListeners)
}

init()
