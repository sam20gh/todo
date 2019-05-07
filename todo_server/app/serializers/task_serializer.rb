class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :due_date, :status, :priority, :project_id
end
