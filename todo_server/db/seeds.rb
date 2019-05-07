Task.all.destroy

Task.create(description: "go to Tesco",
  due_date: 7,
  status: false,
  priority: 1,
  project_id: 1)

Task.create(description: "drive somewhere",
  due_date: 2019-01-03T04:05:06+00:00,
  status: false,
  priority: 2,
  project_id: 2)

Task.create(description: "do something creative",
  due_date: DateTime.new(2014,02,03,4,5,6)
  status: false,
  priority: 1,
  project_id: 3)

Task.create(description: "do something crazy",
    due_date: DateTime.new(2019,02,03,4,5,6),
    status: false,
    priority: 1,
    project_id: 3)
