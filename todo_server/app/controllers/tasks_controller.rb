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

  def create
    task = Task.create(task_params)
    if task
        render json: task
    else
        render json: {error: 'Task not added, as some error has occured'}, status: 404
    end
  end

  private
  def task_params
    params.require(:task).permit(:description, :due_date, :status, :priority, :project_id)
  end
end
