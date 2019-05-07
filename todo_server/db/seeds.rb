Project.create(name: "household",
favourite_status: true,
archive_status: false,
user_id: 1)

Project.create(name: "travelling",
favourite_status: false,
archive_status: false,
user_id: 2)

Project.create(name: "habit builder",
favourite_status: true,
archive_status: false,
user_id: 2)

Task.create(description: "go to Tesco",
  due_date: "2019-02-03T04:05:06+00:00",
  status: false,
  priority: 1,
  project_id: 1)

Task.create(description: "drive somewhere",
  due_date: "2019-01-03T04:05:06+00:00",
  status: false,
  priority: 2,
  project_id: 2)

Task.create(description: "do something creative",
  due_date: "2014-02-03T04:05:06+00:00",
  status: false,
  priority: 1,
  project_id: 3)
