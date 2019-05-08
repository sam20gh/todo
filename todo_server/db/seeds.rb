
User.create(username: "Sam", email: "sam20gh@gmail.com" )
User.create(username: "jx", email: "jxjx@gmail.com" )

Project.create(user_id: 1,name: "Travelling", favourite_status: true, archive_status: false)
Project.create(user_id: 2,name: "Shopping", favourite_status: true, archive_status: false)
Project.create(user_id: 1, name:   "inbox", favourite_status: false, archive_status: true)
Project.create(user_id: 2, name:   "inbox", favourite_status: false, archive_status: true)

Task.create(description: "go to Tesco",
  due_date: DateTime.new(2019,02,03,4,5,6),
  status: false,
  priority: 1,
  project_id: 1)

Task.create(description: "drive somewhere",
  due_date: DateTime.new(2015,02,03,4,5,6),
  status: false,
  priority: 2,
  project_id: 2)

Task.create(description: "do something creative",
  due_date: DateTime.new(2014,02,03,4,5,6),
  status: false,
  priority: 1,
  project_id: 3)

Task.create(description: "do something crazy",
    due_date: DateTime.new(2019,02,03,4,5,6),
    status: false,
    priority: 1,
    project_id: 3)
