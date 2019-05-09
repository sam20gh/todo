API = "http://localhost:3000/users"

// LOGIN STUFF
const initUser = (users, username) => {
  state.users = users
  state.user = state.users.find(x => x.username === username)
}

const getData = () =>
  fetch(API)
  .then(resp=> resp.json())
  .then(users => initUser(users, "Sam"))
