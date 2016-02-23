class SessionsController < ApplicationController

  def new
  end

  def create
  	u = User.find_by(email: params[:session][:email].downcase)
  	if u && u.authenticate(params[:session][:password])
  		log_in u
  		redirect_to u
	else
		flash.now[:danger] = 'Invalid email/password combination.'
		render 'new'
	end
  end

  def destroy
    log_out
    redirect_to root_url
  end

end
