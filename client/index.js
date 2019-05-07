const renderProjectLi = (project) => {
  const projectLi = document.createElement('li')
  projectLi.id = `project-list${project.id}`
  projectLi.innerText = `${project.name}`
  document.body.append(projectLi)
}

const renderProjects = (projects) => {
  projects.forEach(renderProjectLi)
}

const renderTaskLi = (task) => {
  const taskLi = document.createElement('li')
  taskLi.id = `task-list${task.id}`
  taskLi.innerText = `${task.description}`
  document.body.append(taskLi)
}

const renderTasks = (tasks) => {
  tasks.forEach(renderTaskLi)
}

const init = () => {
  renderProjects(USERS[1]["projects"])
  renderTasks(USERS[1]["projects"][0]["tasks"])
}

init()
