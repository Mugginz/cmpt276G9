require 'test_helper'

class UsersIndexTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @u = users(:one)
    @u2 = users(:two)
    @users = User.all
  end

  test "index users" do
    log_in(@u)
    get users_path
    @users.each do |u|
      assert_select 'a[href=?]', user_path(u), text: u.name
    end
  end

  test "redirect on guest" do
  	assert_redirected_to login_url
  end

end
