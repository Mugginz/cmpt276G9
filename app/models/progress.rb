class Progress < ActiveRecord::Base
  validates(:name, presence: true, length: {maximum: 255})
  validates(:user_id, presence: true)
  belongs_to :user
end
