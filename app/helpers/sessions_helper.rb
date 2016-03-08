module SessionsHelper
	def log_in(u)
		session[:uid] = u.id
	end

	def remember(u)
		u.remember
		cookies.permanent.signed[:uid] = u.id
    	cookies.permanent[:remember_token] = u.remember_token
    end

    def forget(u)
		u.forget
		cookies.delete(:uid)
		cookies.delete(:remember_token)
	end

	def log_out
		forget(current_u)
		session.delete(:uid)
		@current_u = nil
	end

	def current_u
		if (uid = session[:uid])
			@current_u ||= User.find_by(id: uid)
		elsif (uid = cookies.signed[:uid])
			u = User.find_by(id: uid)
			if u && u.authenticated?(cookies[:remember_token])
				log_in(u)
				@current_u = u
			end
		end
	end

	def logged_in?
		!current_u.nil?
	end
end
