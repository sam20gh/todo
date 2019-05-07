class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :projects

  class ProjectSerializer < ActiveModel::Serializer
    attributes :id, :name, :favourite_status, :archive_status
    has_many :tasks

    class TaskSerializer < ActiveModel::Serializer
      attributes :id, :description, :due_date, :status, :priority
    end

  end

end
