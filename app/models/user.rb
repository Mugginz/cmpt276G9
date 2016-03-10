class User < ActiveRecord::Base
	attr_accessor :remember_token

	before_save { self.email = email.downcase }
	EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates(:name, presence: true, length: { maximum: 57, minimum: 3 })
	validates(:email, presence: true, length: { maximum: 255 },
		format: { with: EMAIL_FORMAT }, uniqueness: { case_sensitive: false })
	validates(:password, presence: true,length: { minimum: 7, maximum: 71 }, allow_nil: true)
	has_secure_password	

	def User.digest(string)
		    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    	BCrypt::Password.create(string, cost: cost)
	end

# For saving user sessions.
	def User.token_gen
		SecureRandom.urlsafe_base64
	end

	def remember
		self.remember_token = User.token_gen
		update_attribute(:remember_digest, User.digest(remember_token))
	end

	def authenticated?(remember_token)
		if remember_digest.nil?
			false
		else
			BCrypt::Password.new(remember_digest).is_password?(remember_token)
		end
	end

	def forget
		update_attribute(:remember_digest, nil)
	end
end
