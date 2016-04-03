class MapsController < ApplicationController

  def course
    @coords = []
    @na = ""
    if params[:id]
      @c = Course.find(params[:id])
      if @c.name
        @na = @c.name
        @coords = @c.coordinates
      end
    end
  	
    render :layout => false
  end

end
