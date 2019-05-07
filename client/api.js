API = "http://localhost:3000/users"

const getData = () =>
  fetch(API)
  .then(resp=> resp.json())
  .then(getAllUsers)
