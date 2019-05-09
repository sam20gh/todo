API = 'http://localhost:3000/users'
PROJECTS = 'http://localhost:3000/projects'

// LOGIN STUFF
const initUser = (users, username) => {
  state.users = users
  state.user = state.users.find(x => x.username === username)
}

const getData = () =>
  fetch(API)
  .then(resp=> resp.json())
  .then(users => initUser(users, "sam"))

const addProject = () =>
  fetch(PROJECTS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(state.newProject)
  }).then(resp=>resp.json())

const editProjectOnServer = () =>
  fetch(PROJECTS+`/${state.selectedProject.id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(state.selectedProject)
  }).then(resp => resp.json())
