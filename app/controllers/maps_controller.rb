class MapsController < ApplicationController
  def location
    render :layout => false
  end

  def course
	@c = Course.find(1)
  	render :layout => false
  end

end
