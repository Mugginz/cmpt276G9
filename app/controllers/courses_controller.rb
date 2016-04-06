class CoursesController < ApplicationController

  def index
    @courses = Course.all
  end

  def show
    @c = Course.find(params[:id])
    redirect_to controller: 'maps', action: 'course', id: @c.id
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

end
