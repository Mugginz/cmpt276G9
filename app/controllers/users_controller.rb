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
      log_in @u
  		flash[:success] = "Account creation successful."
  		redirect_to @u
  	else
  		render 'new'
  	end
  end

  def edit
    @u = User.find(params[:id])
  end

  def update
    @u = User.find(params[:id])
    if @u.update_attributes(u_params)
      flash[:success] = "Profile updated."
      redirect_to @u
    else
      render 'edit'
    end
  end

  private
  	def u_params
  		params.require(:user).permit(:name, :email, :password, :password_confirmation)
  	end

end
