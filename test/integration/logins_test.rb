require 'test_helper'

class LoginsTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

	def setup
  		@user = users(:one)
	end

	test "valid login" do
    	get login_path
    	post login_path, session: { email: @user.email, password: 'password' }
    	assert_redirected_to @user
    	follow_redirect!
    	assert_template 'users/show'
    	assert logged_in?

    	assert_select "a[href=?]", login_path, count: 0
    	assert_select "a[href=?]", logout_path
	end

	test "valid logout" do
		get login_path
		post login_path, session: { email: @user.email, password: 'password' }
    	assert_redirected_to @user
    	follow_redirect!
    	assert logged_in?

    	delete logout_path
	    assert_not logged_in?
    	assert_redirected_to root_url
    	follow_redirect!
    	assert_select "a[href=?]", login_path
    	assert_select "a[href=?]", logout_path, count: 0
    end

end
