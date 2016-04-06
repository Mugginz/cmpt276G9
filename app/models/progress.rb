class Progress < ActiveRecord::Base
  belongs_to :user
  validates(:name, presence: true, length: {maximum: 255})
  validates(:user_id, presence: true)
end
