class MapsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:update]

  def course
    @coords = []
    if params[:id]
      @c = Course.find(params[:id])
      @coords = @c.coordinates
    end
  	
    render :layout => false
  end

end
