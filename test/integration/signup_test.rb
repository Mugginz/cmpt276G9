require 'test_helper'

class SignupTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "invalid signup" do
    get signup_path
    pre = User.count
    post users_path, user: { name:  "", email: "invalid@email",
                               password: "not", password_confirmation: "seven" }
    aft = User.count
	assert_equal(pre, aft)

    assert_template 'users/new'
  end

  test "valid signup" do
  	get signup_path
  	pre = User.count
	post_via_redirect users_path, user: { name:  "Test User", email: "test_user@email.com",
                                        password: "password", password_confirmation: "password" }
    aft = User.count
    assert_not_equal(pre, aft)

    assert_template 'users/show'
    assert logged_in?
  end

end
