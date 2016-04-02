class MapsController < ApplicationController

  before_filter :init_share_param
  skip_before_action :verify_authenticity_token, only: [:update]

  def location
    render :layout => false
  end

  def course
    # @c = Course.find(5)
    @c = Course.find(params[:id])
  	render :layout => false
  end

  def init_share_param
   params[:shared] ||= 1
  end

  def update
  	@c = Course.find(1)
#    if @c.update_attributes(c_params)
#    if @c.update(coordinates: '{{4,4}}')
#      flash[:success] = "Profile updated."
#    else
#      render 'home'
#    end
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


  private
    def c_params
#      params.require(:c).permit(:coordinates)
#      params.permit(:coordinates)
      params.require(:c).permit(:name, :region, :coordinates)

    end


end
