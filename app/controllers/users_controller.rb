class UsersController < ApplicationController

# Filters required for authorizing user's actions.
  before_action :logged_in_u, only: [:index ,:edit, :update, :destroy]
  before_action :correct_u, only: [:edit, :update, :destroy]

  def show
  	@u = User.find(params[:id])
    @p = @u.progresses
    @courses = Course.all
  end

  def index
    @users = User.all
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
    if current_u.admin? && (@u != current_u)
      redirect_to(@u)
    end
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

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "Account deletion successful."
    if current_u.admin?
      redirect_to(users_url)
    else
      redirect_to(root_url)
    end
  end

  private
  	def u_params
  		params.require(:user).permit(:name, :email, :password, :password_confirmation)
  	end

    def logged_in_u
      unless logged_in?
        cache_location
        flash[:danger] = "Please log in first."
        redirect_to login_url
      end
    end

    def correct_u
      @u = User.find(params[:id])
      unless (@u == current_u) || current_u.admin? 
# ** edit redirection route
        redirect_to(root_url)
      end
    end

end
