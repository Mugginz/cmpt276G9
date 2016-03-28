class CoursesController < ApplicationController

  def index
    @courses = Course.all
    render :layout => false
  end
  
end
