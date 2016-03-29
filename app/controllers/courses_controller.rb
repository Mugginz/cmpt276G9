class CoursesController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @courses = Course.all
    render :layout => false
  end
  
  def new
  	@c = Course.new
  	render :layout => false
  end

  def create
  	n = params[:name]
  	r = params[:region]
  	package = params[:coords]
	arr = eval(package)
	@c = Course.new(name: n, region: r, coordinates: arr)
	if @c.save
		flash[:success] = "Course creation successful."
		redirect_to 'index'
	else
		redirect_to '/create'
	end
  end

  private

  	def c_params
  		params.require(:course).permit(:name, :region, :coordinates)
  	end

end
