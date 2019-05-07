class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :projects

  class ProjectSerializer < ActiveModel::Serializer
    attributes :id, :name, :favourite_status, :archive_status, :user_id
    has_many :tasks

    class TaskSerializer < ActiveModel::Serializer
      attributes :id, :description, :due_date, :status, :priority, :project_id
    end

  end

end
