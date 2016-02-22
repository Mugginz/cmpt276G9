class UsersController < ApplicationController
  def show
  	@u = User.find(params[:id])
  end

  def new
  	@u = User.new
  end

  def create
  	@u = User.new(u_params)
  	if @u.save
  		flash[:success] = "Account creation successful."
  		redirect_to @u
  	else
  		render 'new'
  	end
  end


  private
  	def u_params
  		params.require(:user).permit(:name, :email, :password, :password_confirmation)
  	end

end
