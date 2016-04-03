class MapsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:update]

  def course
    
    @courses = Course.all
    @coords = []
    if params[:id]
      @c = Course.find(params[:id])
      @coords = @c.coordinates
    end
  	
  render :layout => false
#    render :searchItems
  end

end
