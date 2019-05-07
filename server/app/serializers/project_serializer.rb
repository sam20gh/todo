class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :favourite_status, :archive_status, :user_id
end
