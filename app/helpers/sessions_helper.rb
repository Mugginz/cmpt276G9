module SessionsHelper
	def log_in(u)
		session[:uid] = u.id
	end

	def log_out
		session.delete(:uid)
		@current_u = nil
	end

	def current_u
		@current_u ||= User.find_by(id: session[:uid])
	end

	def logged_in?
		!current_u.nil?
	end
end
