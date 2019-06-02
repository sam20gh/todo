const baseUrl = 'http://localhost:3000/tasks'

//Elements to render stuff to
const projectList = document.querySelector('#project-list')
const newProjectContainer = document.querySelector('.add-new-project-container')
const itemList = document.querySelector('#item-list')
const viewAll = document.querySelector('#view-all')
const viewCompleted = document.querySelector('#view-completed')
const noDueDate = document.querySelector('#no-due-date')
const todayTab = document.querySelector('#today-tab')
const thisWeekTab = document.querySelector('#this-week-tab')
const loginBar = document.querySelector('.login_bar')

//Elements to add listeners to
const switchBtn = document.querySelector('#switch-btn')
const newTaskButtonLeft = document.querySelector('#new-task-left')
const loginForm = document.querySelector('#login-form')

let state = {
  users: null,
  user: null,
  allProjects: [],
  allTasks: [], //flattened array
  inboxId: null,
  allOutstandingTasks: [],
  allCompletedTasks: [],
  project_ostasks: [],
  priority_ostasks: [
    { priority: 1, tasks: null },
    { priority: 2, tasks: null },
    { priority: 3, tasks: null },
    { priority: 4, tasks: null }
  ],
  favouriteProjects: [],
  archivedProjects: [],
  selectedProject: null,
  tasksInProject: [],
  selectedTask: null,
  newTask: [],
  switchUser: false,
  addTaskStatus: false
}

//new Task event listener
const addNewTaskListener = () => {
  newTaskButtonLeft.addEventListener('click', () => {
    if (!state.addTaskStatus) {
      addNewTaskForm()
      state.addTaskStatus = !state.addTaskStatus
    }
  })
}

const addNewTaskForm = task => {
  const newTaskTr = document.createElement('form')
  newTaskTr.id = 'task-form'
  newTaskTr.innerHTML = `
   <div class="new-row">
   
    <div class="col-md-4">
      <div class=view-message ><input type='text' class="form-control" placeholder="Task Description" name="description" required> </div>
    </div>
    
    <div class="col-md-4">
     <div class="form-group">
      <div class='input-group date' id='datetimepicker'>
        <input type='text' class="form-control" name="date" required />
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
      </div>
     </div>
    </div>

    <div class="col-md-2">
      <select id="priority" name="priority" class="form-control">
        <option value="1">Priority 1</option>
        <option value="2">Priority 2</option>
        <option value="3">Priority 3</option>
        <option value="4">Priority 4</option>
      </select>
    </div>
  
    <div class="col-md-2">
      <select id="project" name="project-id" class="form-control"></select>
    </div>
    </div>
    <div class="new-row">

    <div class="pull-right">  <button type="button" class="btn btn-success" id="saveNewTask" >Save</button>
      <button type="button" class="btn btn-danger" id="cancelNewTask" >Cancel</button></div>

    </div>
   `
  const renderProjectOption = project => {
    const optionEl = document.createElement('option')
    optionEl.value = project.id
    optionEl.innerText = `${project.name}`

    const projectDropdown = newTaskTr.querySelector('#project')
    projectDropdown.append(optionEl)
  }

  const renderProjectOptions = projects => projects.forEach(renderProjectOption)

  renderProjectOptions(state.allProjects)
  const saveTask = newTaskTr.querySelector('#saveNewTask')
  const cancelTask = newTaskTr.querySelector('#cancelNewTask')
  saveTask.addEventListener('click', event => {
    event.preventDefault()
    addNewTask()
    state.addTaskStatus = !state.addTaskStatus
  })

  cancelTask.addEventListener('click', event => {
    event.preventDefault()
    newTaskTr.remove()
    state.addTaskStatus = !state.addTaskStatus
  })

  const timeField = newTaskTr.querySelector('#datetimepicker')
  timeField.addEventListener('click', () => {
    event.preventDefault()
    $('#datetimepicker').datetimepicker({
      sideBySide: true
    })
  })

  const addNewTask = () => {
    const formEl = document.querySelector('#task-form')
    state.newTask.name = formEl.description.value
    state.newTask.date = formEl.date.value
    state.newTask.priority = formEl.priority.value
    state.newTask.project = formEl.project.value
    formEl.reset()

    let task = {
      description: state.newTask.name,
      due_date: new Date(state.newTask.date).toISOString(),
      status: false,
      priority: state.newTask.priority,
      project_id: state.newTask.project
    }

    newTaskTr.innerHTML = ``

    let taskProject = state.allProjects.find(p => p.id == task.project_id)
    createTask(task).then(task => {
      addItemToArray(state.tasksInProject, task)
      renderTasks(state.tasksInProject)
      reRenderProjectLi(taskProject, 'increase')
      formEl.reset()
    })
  }

  const itemList = document.querySelector('.new-task')
  itemList.prepend(newTaskTr)
}

// Switch user event listener

const addListenerLogin = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault()
    state.switchUser = !state.switchUser
    if (state.switchUser) {
      loginForm.style.display = 'block'
    } else {
      loginForm.style.display = 'none'
    }
    findOrCreateUser(`${loginForm.username.value}`)
  })
}

const addListenerSwitchUser = () => {
  switchBtn.addEventListener('click', event => {
    state.switchUser = !state.switchUser
    if (state.switchUser) {
      loginForm.style.display = 'block'
    } else {
      loginForm.style.display = 'none'
    }
  })
}

const findOrCreateUser = username => {
  user = state.users.find(
    x => x.username.toLowerCase() === username.toLowerCase()
  )
  if (user) {
    allUsers = state.users
    state = {
      users: null,
      user: null,
      allProjects: [],
      allTasks: [], //flattened array
      inboxId: null,
      allOutstandingTasks: [],
      allCompletedTasks: [],
      project_ostasks: [],
      priority_ostasks: [
        { priority: 1, tasks: null },
        { priority: 2, tasks: null },
        { priority: 3, tasks: null },
        { priority: 4, tasks: null }
      ],
      favouriteProjects: [],
      archivedProjects: [],
      selectedProject: null,
      tasksInProject: [],
      selectedTask: null,
      newTask: [],
      switchUser: false
    }
    state.user = user
    state.users = allUsers
    makePage()
    loginForm.style.display = 'none'
  } else {
    const answer = confirm(
      `${username} is not a registered user. Contact existing users i.e. Sam or JX for an invitation to join this exclusive todolist ლ( ̅°̅ ੪ ̅°̅ )ლ If it's a typo, click OK to try again.`
    )
    if (answer) {
      loginForm.style.display = 'block'
      state.switchUser = !state.switchUser
    } else {
      loginForm.style.display = 'none'
      loginForm.reset()
    }
  }
}

const addListenerAllPriorities = () => {
  for (let i = 1; i < state.priority_ostasks.length + 1; i++) {
    document.querySelector(`#priority-${i}`).addEventListener('click', () => {
      if (state.priority_ostasks.find(o => o.priority == i).tasks.length > 0) {
        const projectHeader = document.querySelector('#project-title')
        projectHeader.innerHTML = `<h3>Filtered Tasks: Priority ${i}</h3>`
        renderTasks(state.priority_ostasks.find(o => o.priority == i).tasks)
      } else {
        const projectHeader = document.querySelector('#project-title')
        projectHeader.innerHTML = `<h3>Filtered Tasks: Priority ${i}</h3>`
        renderTaskTr()
      }
    })
  }
}

const addListenerToFilterTabItems = () => {
  addListenerAllPriorities()
  viewAll.addEventListener('click', () => {
    state.selectedProject = null
    renderProjectHeader()
    renderTasks(state.allOutstandingTasks)
  })
  viewCompleted.addEventListener('click', () => {
    state.selectedProject = null
    const projectHeader = document.querySelector('#project-title')
    projectHeader.innerHTML = `
      <h3>All Completed Tasks</h3>
      `
    renderTasks(state.allCompletedTasks)
  })
  noDueDate.addEventListener('click', () =>
    alert('This is a paid premium feature!')
  )
  todayTab.addEventListener('click', () =>
    alert('This is a paid premium feature!')
  )
  thisWeekTab.addEventListener('click', () =>
    alert('This is a paid premium feature!')
  )
}

//LOGIC FOR STATE
const allProjectsForState = () => (state.allProjects = state.user.projects)
const allFavouriteProjects = () => {
  state.favouriteProjects = state.allProjects.filter(
    p => p.favourite_status === true
  )
}
const allArchivedProjects = () => {
  state.archivedProjects = state.allProjects.filter(
    p => p.archive_status === true
  )
}
const addItemToArray = (array, item) => array.push(item)
const addItemsToArray = (array, items) =>
  items.forEach(item => addItemToArray(array, item))
const allTasksForState = () => {
  state.allProjects.forEach(p => addItemsToArray(state.allTasks, p['tasks']))
}
const findAllOutstandingTasks = () => {
  state.allOutstandingTasks = state.allTasks.filter(t => t.status == false)
}
const findAllCompletedTasks = () => {
  state.allCompletedTasks = state.allTasks.filter(t => t.status == true)
}
const findOutstandingTasksInProject = project_id => {
  let selectedProject = state.allProjects.find(p => p.id == project_id)
  if (selectedProject) {
    let allTasksInThisProject = selectedProject.tasks
    let result = allTasksInThisProject.filter(t =>
      state.allOutstandingTasks.includes(t)
    )
    return result
  } else {
    return (result = [])
  }
}
const findPriorityTasksPair = priority_level => {
  object = state.priority_ostasks.find(o => o.priority == priority_level)
  object.tasks = state.allOutstandingTasks.filter(
    t => t.priority == priority_level
  )
}
const findPriorityTasksPairs = () => {
  findPriorityTasksPair(1)
  findPriorityTasksPair(2)
  findPriorityTasksPair(3)
  findPriorityTasksPair(4)
}
const inboxTasksForState = () => {
  state.selectedProject = state.allProjects.find(
    p => p.name.toLowerCase() == 'inbox'
  )
  state.inboxId = state.selectedProject.id
  state.tasksInProject = findOutstandingTasksInProject(state.selectedProject.id)
}
const renderUserData = () => {
  const userProfile = document.querySelector('#user-profile')
  userProfile.innerHTML = `
    <h5>${state.user.username}</h5>
    <span>${state.user.email}</span>
  `
}

const addStuffToState = () => {
  allProjectsForState()
  allTasksForState()
  findAllOutstandingTasks()
  findAllCompletedTasks()
  allFavouriteProjects()
  allArchivedProjects()
  inboxTasksForState()
  findPriorityTasksPairs()
}

// CRUD for tasks

//THINGS TO RENDER FROM DATABASE OR STATE

const renderNavigationLi = () => {
  const inboxLi = document.querySelector('#inbox-tab')
  inboxLi.innerHTML = `
  <a href="#"><i class="fa fa-inbox"></i> Inbox <span class="label label-info pull-right">${
    findOutstandingTasksInProject(state.inboxId).length
  }</span></a>
  `
  inboxLi.addEventListener('click', () => {
    state.selectedProject = state.allProjects.find(p => p.id === state.inboxId)
    renderProjectHeader()
    renderTasks(state.tasksInProject)
  })
}

const renderProjectHeader = () => {
  const projectHeader = document.querySelector('#project-title')
  if (state.selectedProject) {
    projectHeader.innerHTML = `
      <h3>${state.selectedProject.name}</h3>
      `
  } else {
    projectHeader.innerHTML = `
        <h3>All Outstanding Tasks</h3>
        `
  }
}

const renderProjectLi = project => {
  if (project.id != state.inboxId) {
    const projectLi = document.createElement('li')
    projectLi.id = `project-count-${project.id}`
    projectLi.innerHTML = `
    <a href="#">
      <i class="fa fa-circle text-danger"></i>
      ${project.name}
      <span class="label label-default pull-right" id='edit-project-${
        project.id
      }'>Edit</span>
      <span class="label label-info pull-right">${
        findOutstandingTasksInProject(project.id).length
      }</span>
    </a>
  `

    const editBtn = projectLi.querySelector('.label-default')
    editBtn.addEventListener('click', event => {
      event.stopPropagation()
      state.selectedProject = project
      editProject(project)
    })

    projectLi.addEventListener('click', () => {
      state.selectedProject = project
      renderProjectHeader()
      renderTasks(findOutstandingTasksInProject(project.id))
    })

    projectList.append(projectLi)
  }
}

const reRenderProjectLi = (project, str) => {
  if (project.id === state.inboxId) {
    const selectedProjectLi = document.querySelector(`#inbox-tab`)

    if (str === 'increase') {
      selectedProjectLi.innerHTML = `
      <a href="#"><i class="fa fa-inbox"></i> 
          Inbox
          <span class="label label-info pull-right">${findOutstandingTasksInProject(
            project.id
          ).length + 1}</span>
      </a>
      `
    } else {
      selectedProjectLi.innerHTML = `
       <a href="#"><i class="fa fa-inbox"></i> 
        Inbox
        <span class="label label-info pull-right">${
          findOutstandingTasksInProject(project.id).length
        }</span>
      </a>
    `
    }

    selectedProjectLi.addEventListener('click', () => {
      state.selectedProject = project
      renderProjectHeader()
      renderTasks(findOutstandingTasksInProject(project.id))
    })

    selectedProjectLi.addEventListener('click', () => {
      state.selectedProject = project
      renderProjectHeader()
      renderTasks(findOutstandingTasksInProject(project.id))
    })
  } else {
    const selectedProjectLi = document.querySelector(
      `#project-count-${project.id}`
    )

    if (str === 'increase') {
      selectedProjectLi.innerHTML = `
      <a href="#">
        <i class="fa fa-circle text-danger"></i>
        ${project.name}
        <span class="label label-default pull-right" id='edit-project-${
          project.id
        }'>Edit</span>
        <span class="label label-info pull-right">${findOutstandingTasksInProject(
          project.id
        ).length + 1}</span>
      </a>
    `
    } else {
      selectedProjectLi.innerHTML = `
      <a href="#">
        <i class="fa fa-circle text-danger"></i>
        ${project.name}
        <span class="label label-default pull-right" id='edit-project-${
          project.id
        }'>Edit</span>
        <span class="label label-info pull-right">${
          findOutstandingTasksInProject(project.id).length
        }</span>
      </a>
    `
    }

    const editBtn = selectedProjectLi.querySelector('.label-default')
    editBtn.addEventListener('click', event => {
      event.stopPropagation()
      state.selectedProject = project
      editProject(project)
    })

    selectedProjectLi.addEventListener('click', () => {
      state.selectedProject = project
      renderProjectHeader()
      renderTasks(findOutstandingTasksInProject(project.id))
    })
  }
}

const editProject = project => {
  const selectedProjectLi = document.querySelector(
    `#project-count-${project.id}`
  )
  selectedProjectLi.innerHTML = `
  <a href="#">
    <i class="fa fa-circle text-warning"></i>
    <form id = "edit-project-form">
      <div class=view-message ><input type='text' class="form-control" value='${
        project.name
      }' name="project-name"></div>
      <button type='submit' class="form-control" value="submit" name="submit">Edit Project</button>
    </form>
    <button class="form-control" name="delete" id="delete-project-${
      project.id
    }">Delete</button>
    <button class="form-control" name="cancel" id="cancel-edit-${
      project.id
    }">Cancel</button>
  </a>
  `
  const editProjectForm = selectedProjectLi.querySelector('#edit-project-form')
  editProjectForm.addEventListener('submit', event => {
    event.preventDefault()
    state.selectedProject.name = editProjectForm['project-name'].value
    const projectHeader = document.querySelector('#project-title')
    projectHeader.innerHTML = `<h3>${
      editProjectForm['project-name'].value
    }</h3>`
    editProjectOnServer().then(renderProjects(state.allProjects))
  })

  const deleteProjectBtn = selectedProjectLi.querySelector(
    `#delete-project-${project.id}`
  )
  deleteProjectBtn.addEventListener('click', () => {
    const answer = confirm('Are you sure you want to delete the project?')
    if (answer) {
      deleteProjectOnServer().then(projects => {
        renderProjects(projects)
        //need to delete tasks related to this project from All Outstanding Tasks
        //state.selectedProject.tasks
        state.selectedProject = state.allProjects.find(
          p => p.id == state.inboxId
        )
        renderTasks(findOutstandingTasksInProject(state.selectedProject.id))
        renderProjectHeader()
      })
    } else {
      renderProjects(state.allProjects)
    }
  })

  const cancelEditBtn = document.querySelector(`#cancel-edit-${project.id}`)
  cancelEditBtn.addEventListener('click', () =>
    renderProjects(state.allProjects)
  )
}

let showProjectForm = false //for show/hiding New Project Form
const renderProjects = projects => {
  projectList.innerHTML = `
  <li><h4>Projects<button type="button" class="label label-info pull-right" id="project-btn">+</button></h4></li>
  <div class="add-new-project-container">
    <form id = "new-project-form">
      <div class=view-message ><input type='text' class="form-control" placeholder="Name Your Project" name="name"></div>
      <button type='submit' class="form-control" value="submit" name="submit">Add Project</button>
    </form>
  </div>
  `

  const showProjectBtn = projectList.querySelector('#project-btn')
  const newProjectForm = projectList.querySelector('#new-project-form')

  showProjectBtn.addEventListener('click', () => {
    showProjectForm = !showProjectForm
    if (showProjectForm) {
      newProjectForm.style.display = 'block'
    } else {
      newProjectForm.style.display = 'none'
    }
  })

  newProjectForm.addEventListener('submit', event => {
    event.preventDefault()
    newProject = {
      name: newProjectForm.name.value,
      favourite_status: false,
      archive_status: false,
      user_id: state.user.id,
      tasks: []
    }
    state.allProjects.push(newProject)
    state.newProject = newProject
    addProject().then(project => {
      addItemToArray(state.allProjects, project)
      state.selectedProject = project
      renderProjectLi(state.selectedProject)
      renderTasks(state.selectedProject.tasks)
      renderProjectHeader()
      newProjectForm.reset()
      showProjectForm = false
      newProjectForm.style.display = 'none'
      state.newProject = null
    })
  })

  projects.forEach(renderProjectLi)
}

const dateTimeParser = datestr => {
  const jsDate = new Date(datestr)
  dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return jsDate.toLocaleDateString('en-US', dateOptions)
}

const renderTaskTr = task => {
  if (task) {
    // if (state.selectedProject.id && task.project_id === state.selectedProject.id) {
    const taskTr = document.createElement('tr')
    taskTr.id = `task-row${task.id}`
    let taskProjectName = state.allProjects.find(p => p.id == task.project_id)
      .name
    let parsedDate = dateTimeParser(task.due_date)
    taskTr.innerHTML = `
        <td class="inbox-small-cells">
          <input type="checkbox" class="mail-checkbox" name="checkbox">
        </td>
        <td class="inbox-small-cells"><i class="fa fa-heart" aria-hidden="true"></i></td>
        <td class="view-message ">${task.description}</td>
        <td class="view-message inbox-small-cells text-right"><i>${taskProjectName}</i></td>
        <td class="view-message inbox-small-cells text-right"><i>Priority: ${
          task.priority
        }</i></td>
        <td class="view-message text-right">${parsedDate}</td>
      </tr>
    `
    itemList.append(taskTr)
    const archiveTask = taskTr.querySelector('.mail-checkbox')
    archiveTask.addEventListener('click', event => {
      event.preventDefault()
      task.status = true
      taskTr.innerHTML = ``
      findAllOutstandingTasks()
      findAllCompletedTasks()
      updateTask(task)
      let taskProject = state.allProjects.find(p => p.id == task.project_id)
      reRenderProjectLi(taskProject, 'decrease')
    })
  } else {
    itemList.innerHTML = ``
    const taskTr = document.createElement('tr')
    taskTr.innerHTML = `
      <td class="view-message text-center"> </td>
      <td class="view-message text-center"> </td>
      <td class="view-message text-center">No task in here at the moment - everything is in order!</td>
      <td class="view-message text-center"></td>
      <td class="view-message text-center"></td>
    </tr>
    `
    itemList.append(taskTr)
  }
}

const renderTasks = tasks => {
  if (tasks.length > 0) {
    itemList.innerHTML = ``
    tasks.forEach(renderTaskTr)
  } else {
    renderTaskTr()
  }
}

const clearPreviousData = () => {
  projectList.innerHTML = ``
  itemList.innerHTML = ``
}
const renderStuffFromState = () => {
  renderUserData()
  renderNavigationLi()
  renderProjectHeader()
  renderProjects(state.allProjects)
  if (state.tasksInProject.length > 0) {
    renderTasks(state.tasksInProject)
  }
}
const makePage = () => {
  clearPreviousData()
  addStuffToState()
  renderStuffFromState()
}
const addBasicListeners = () => {
  addListenerSwitchUser()
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
