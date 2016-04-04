require 'test_helper'

class UsersControllerTest < ActionController::TestCase

  def setup
    @a = users(:zero)
    @u = users(:one)
  end

  test "get new" do
    get :new
    assert_response :success
  end

  test "disallow edit admin" do
    log_in(@u)
    assert_not @u.admin?
    patch :update, id: @u, user: { password: 'password', password_confirmation: 'password', admin: true }
    assert_not @u.admin?
  end


end
