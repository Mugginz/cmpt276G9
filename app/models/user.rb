class User < ActiveRecord::Base
	before_save { self.email = email.downcase }
	EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates(:name, presence: true, length: { maximum: 57, minimum: 3 })
	validates(:email, presence: true, length: { maximum: 255 },
		format: { with: EMAIL_FORMAT }, uniqueness: { case_sensitive: false })
	has_secure_password	
	validates(:password, presence: true,length: { minimum: 7, maximum: 255 })
end
