class MapsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:update]

  def location
    render :layout => false
  end



#  def course
#	@c = Course.find(1)
#  	render :layout => false
#  end

  def course
	   @courses = Course.all
  	render :layout => false
  end

  #course selected by user
  def selected
    c_param = params[:course_param]
    @c = Course.find_by_name(c_param)

    render 'location'
  end


  def update
  	@c = Course.find(1)

	package = params[:coords]
	arr = eval(package)
# Comparison used for debugging.
# Check rails server logs for rendered view to confirm ajax result.
	if arr[0][0] == 20
		render 'location'
	else
		render 'course'
	end

  if @c.update_attributes(coordinates: arr)
    flash[:success] = "Profile updated."
  else
    render 'home'
  end

  end


end
