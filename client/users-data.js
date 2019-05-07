const USERS = [
  {
    id: 1,
    username: "sam",
    email: "sam@sam.com",
    projects: [
      {
      id: 1,
      name: "household",
      favourite_status: true,
      archive_status: false,
      tasks: [
      {
      id: 1,
      description: "go to Tesco",
      due_date: "2019-02-03T04:05:06.000Z",
      status: false,
      priority: 1
    }]}]},
  {
    id: 2,
    username: "jx",
    email: "jx@jx.com",
    projects: [
      {
        id: 2,
        name: "travelling",
        favourite_status: false,
        archive_status: false,
        tasks: [
          {
            id: 2,
            description: "drive somewhere",
            due_date: "2019-01-03T04:05:06.000Z",
            status: false,
            priority: 2
          }]},
      {
        id: 3,
        name: "habit builder",
        favourite_status: true,
        archive_status: false,
        tasks: [
          {
            id: 3,
            description: "do something creative",
            due_date: "2014-02-03T04:05:06.000Z",
            status: false,
            priority: 1
          }]}]}
        ]
