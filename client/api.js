API = "http://localhost:3000/users"

// LOGIN STUFF
let allUsers
const getAllUsers = (users) => allUsers = users
const findUser = (users, username) => {
  state.user = allUsers.find(x => x.username === username)
}

const getData = () =>
  fetch(API)
  .then(resp=> resp.json())
  .then(getAllUsers)
  .then(users => findUser(users, "Sam"))
