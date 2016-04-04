require 'test_helper'

class UsersIndexTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @u = users(:one)
    @u2 = users(:two)
    @zero = users(:zero)
    @users = User.all
  end

  test "index users" do
    log_in(@u)
    get users_path
    @users.each do |u|
      assert_select 'a[href=?]', user_path(u), text: u.name
    end
  end

  test "index as non-admin" do
    log_in(@u)
    get users_path
    assert_select 'a', text: 'delete', count: 0
  end

end
