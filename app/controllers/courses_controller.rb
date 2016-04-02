class CoursesController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @courses = Course.all
    render :layout => false
  end

  def show
    @c = Course.find(params[:id])
#    render template: "maps/course"
#    render "maps/course"
    redirect_to controller: 'maps', action: 'course', id: @c.id
    #params[:shared] ||= @c.id
#    render template: "maps/course"
  end

  def new
  	@c = Course.new
  	render :layout => false
  end

  def create
  	n = params[:name]
  	r = params[:region]
  	package = params[:coords]
  	if (package.nil?)
		redirect_to '/courses'
	else
		arr = eval(package)
		@c = Course.new(name: n, region: r, coordinates: arr)
		if @c.save
			flash[:success] = "Course creation successful."
			redirect_to '/courses'
		else
			redirect_to '/create'
		end
	end
  end

  def destroy
    Course.find(params[:id]).destroy
    flash[:success] = "Course deletion successful."
    if current_u.admin?
      redirect_to(courses_url)
    else
      redirect_to(root_url)
    end
  end

  private

  	def c_params
  		params.require(:course).permit(:name, :region, :coordinates)
  	end

end
