class ProjectsController < ApplicationController
  def index
    projects = Project.all
    if projects
        render json: projects
    else
        render json: {error: 'No project found'}, status: 404
    end
  end

  def show
    project = Project.find_by(id: params[:id])
    if project
      render json: project
    else
      render json: {error: 'No project found'}, status: 404
    end
  end

  def create
    project = Project.new(project_params)
    if project.save
      render json: project
    else
      render json: {error: 'Project is not added, as some error has occured'}, status: 404
    end
  end

  def update
    project = Project.find_by(id: params[:id])
    project.update(project_params)
    if project
      render json: project
    else
      render json: {error: 'Project is not edited, as some error has occured'}, status: 404
    end
  end

  private
  def project_params
    params.require(:project).permit(:name,:favourite_status,:archive_status,:user_id,:tasks)
  end

end
