class Course < ActiveRecord::Base
	validates(:name, presence: true, length: {maximum: 255})
	validates(:coordinates, presence: true)
end
