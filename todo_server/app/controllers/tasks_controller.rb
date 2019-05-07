class TasksController < ApplicationController
  def index
    tasks = Task.all
    if tasks
        render json: tasks
    else
        render json: {error: 'No tasks found'}, status: 404
      end
  end
  
  def show
    task = Task.find_by(id: params[:id])
    if task
        render json: task
    else
        render json: {error: 'No task found'}, status: 404
    end
  end
end
