class ProjectsController < ApplicationController
    def show
        project = Project.find_by(id: params[:id])
        if project
            render json: project
        else
            render json: {error: 'No project found'}, status: 404
        end
    end
      def index
        projects = Project.all
        if projects
            render json: projects
        else
            render json: {error: 'No project found'}, status: 404
        end
    end
end
