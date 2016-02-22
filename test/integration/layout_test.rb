require 'test_helper'

class LayoutTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test "layout links" do
  	get root_path
  	assert_template 'statics/home'
  	assert_select "a[href=?]", root_path
  	assert_select "a[href=?]", about_path
  	assert_select "a[href=?]", help_path
  end

end
