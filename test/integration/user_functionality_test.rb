require 'test_helper'

class UserFunctionalityTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @user = users(:one)
  end

  test "unsuccessful edit" do
  	log_in @user
    get edit_user_path(@user)
    assert_template 'users/edit'
    patch user_path(@user), user: { name:  "", email: "invalid@email",
                                    password: "too", password_confirmation: "short" }
    assert_template 'users/edit'
  end

  test "successful edit" do
  	log_in @user
    get edit_user_path(@user)
    assert_template "users/edit"
    patch user_path(@user), user: { name: "New Name", email: "newtest@email.com",
                                    password: "", password_confirmation: "" }
    assert_redirected_to @user
    @user.reload
    assert_equal "New Name",  @user.name
    assert_equal "newtest@email.com", @user.email
  end

  test "unsuccessful deleteion" do
  	log_in @user
    get edit_user_path(@user)
    assert_template "users/edit"
    pre = User.count
    delete user_path(@user), user: { name: "no user", email: "void@email.com",
                                    password: "password", password_confirmation: "password" }
    aft = User.count
    assert_not_equal(pre, aft)
  end

  test "successful deletion" do
  	log_in @user
    get edit_user_path(@user)
    assert_template "users/edit"
    pre = User.count
    delete user_path(@user), user: { name: "test user1", email: "testuser1@email.com",
                                    password: "password", password_confirmation: "password" }
    aft = User.count
    assert_not_equal(pre, aft)
  end

end
