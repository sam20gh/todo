class UsersController < ApplicationController
  def index
    users = User.all
    if users
        render json: users, include: '**'
    else
        render json: {error: 'No tasks found'}, status: 404
      end
  end

end
